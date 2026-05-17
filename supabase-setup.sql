-- Supabase Database Schema for Mobile App
-- Run this in Supabase Dashboard > SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (links to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User API Keys for HuggingFace
CREATE TABLE public.user_api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  provider TEXT NOT NULL, -- 'huggingface', 'openai', etc
  api_key TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User Settings
CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  theme TEXT DEFAULT 'light',
  language TEXT DEFAULT 'en',
  notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only access their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Conversations: users can only access their own conversations
CREATE POLICY "Users can manage own conversations" ON public.conversations
  FOR ALL USING (auth.uid() = user_id);

-- Messages: users can only access their own messages
CREATE POLICY "Users can manage own messages" ON public.messages
  FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM public.conversations WHERE id = messages.conversation_id)
  );

-- User API Keys: users can only manage their own keys
CREATE POLICY "Users can manage own api keys" ON public.user_api_keys
  FOR ALL USING (auth.uid() = user_id);

-- User Settings: users can only manage their own settings
CREATE POLICY "Users can manage own settings" ON public.user_settings
  FOR ALL USING (auth.uid() = user_id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
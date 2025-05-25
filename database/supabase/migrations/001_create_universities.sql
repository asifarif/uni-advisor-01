-- Create universities table
CREATE TABLE IF NOT EXISTS universities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    established INTEGER NOT NULL,
    type university_type NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    description TEXT,
    contact JSONB,
    ranking JSONB,
    facilities TEXT[],
    accreditations TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create enum for university type
CREATE TYPE university_type AS ENUM ('public', 'private');

-- Create index for faster queries
CREATE INDEX idx_universities_city ON universities(city);
CREATE INDEX idx_universities_province ON universities(province);
CREATE INDEX idx_universities_type ON universities(type);
CREATE INDEX idx_universities_slug ON universities(slug);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    degree_level degree_level NOT NULL,
    faculty VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    credit_hours INTEGER,
    description TEXT,
    requirements TEXT[],
    career_prospects TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create enum for degree level
CREATE TYPE degree_level AS ENUM ('undergraduate', 'graduate', 'postgraduate');

-- Create indexes
CREATE INDEX idx_programs_university ON programs(university_id);
CREATE INDEX idx_programs_degree_level ON programs(degree_level);
CREATE INDEX idx_programs_faculty ON programs(faculty);

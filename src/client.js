import { createClient } from '@supabase/supabase-js';

const URL = 'https://ntcpvbothacleuzvgkha.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50Y3B2Ym90aGFjbGV1enZna2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzMTk3MjEsImV4cCI6MjAzNzg5NTcyMX0.y2y6QcVBiNrkdxEYbGIEHqFs9DBcDSUhhGNgoWaPmoI';

export const supabase = createClient(URL, API_KEY);
-- Same reasoning as `session_track`: level is a fixed set of values, so an
-- enum keeps that set in the schema and `pnpm db:types` generates the union
-- for free instead of a hand-written one that can drift from the database.

create type public.session_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

alter table public.sessions
  add column if not exists level public.session_level;

-- Backfill every existing session before the column is made not-null, so no
-- row is ever left without a level.
update public.sessions set level = 'beginner' where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced' where id = 'server-components-deep-dive';
update public.sessions set level = 'advanced' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced' where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner' where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;

-- No RLS change: the existing per-row read policy on `sessions` already
-- covers this new column.

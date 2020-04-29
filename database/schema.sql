DROP TABLE IF EXISTS edits, scores;

CREATE TABLE edits (
  id serial PRIMARY KEY NOT NULL,
  uuid varchar(15) NOT NULL,
  action varchar(10) NOT NULL,
  pitch varchar(3) NOT NULL,
  measure numeric(3, 0) NOT NULL,
  start numeric(4, 0) NOT NULL,
  duration numeric(4, 0)
);

CREATE TABLE scores (
  id serial PRIMARY KEY NOT NULL,
  edit_id serial NOT NULL,
  score jsonb NOT NULL
);

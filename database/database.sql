-- public.students definition

-- Drop table

-- DROP TABLE public.students;

CREATE TABLE public.students (
	id uuid NOT NULL,
	ra serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	cpf varchar(11) NOT NULL,
	passhash varchar(255) NOT NULL,
	salt varchar(255) NOT NULL,
	confirmationtoken varchar(64) NULL,
	CONSTRAINT students_cpf_key UNIQUE (cpf),
	CONSTRAINT students_pkey PRIMARY KEY (id)
);

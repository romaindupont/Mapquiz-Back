--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10 (Debian 11.10-0+deb10u1)
-- Dumped by pg_dump version 11.10 (Debian 11.10-0+deb10u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: romain
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    label character varying(64) NOT NULL,
    is_correct integer NOT NULL,
    picture character varying(128),
    id_question integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.answers OWNER TO romain;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: romain
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_id_seq OWNER TO romain;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: romain
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: avatars; Type: TABLE; Schema: public; Owner: romain
--

CREATE TABLE public.avatars (
    id integer NOT NULL,
    name character varying(64),
    picture character varying(128),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.avatars OWNER TO romain;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: romain
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.categories OWNER TO romain;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: romain
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO romain;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: romain
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.categories.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: romain
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    question character varying(64) NOT NULL,
    picture character varying(128),
    difficulty integer NOT NULL,
    id_category integer NOT NULL,
    trivia character varying(128),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.questions OWNER TO romain;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: romain
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO romain;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: romain
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: trophies; Type: TABLE; Schema: public; Owner: romain
--

CREATE TABLE public.trophies (
    id integer NOT NULL,
    name character varying(64),
    description character varying(64),
    picture character varying(128),
    min_level_to_unlock integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.trophies OWNER TO romain;

--
-- Name: users; Type: TABLE; Schema: public; Owner: romain
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password character varying(64) NOT NULL,
    email character varying(64) NOT NULL,
    nickname character varying(64),
    level integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    id_avatar integer
);


ALTER TABLE public.users OWNER TO romain;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: romain
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO romain;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: romain
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: romain
--

COPY public.answers (id, label, is_correct, picture, id_question, created_at, updated_at) FROM stdin;
1	FRANCE	0		1	\N	\N
2	USA	0		1	\N	\N
3	EGYPTE	1		1	\N	\N
4	AUSTRALIE	0		1	\N	\N
5	La Tunisie	0	\N	2	\N	\N
6	L'Afrique du Sud	0	\N	2	\N	\N
7	Le Mali	0	\N	2	\N	\N
8	L'Algérie	1	\N	2	\N	\N
\.


--
-- Data for Name: avatars; Type: TABLE DATA; Schema: public; Owner: romain
--

COPY public.avatars (id, name, picture, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: romain
--

COPY public.categories (id, name, created_at, updated_at) FROM stdin;
1	Afrique	\N	\N
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: romain
--

COPY public.questions (id, question, picture, difficulty, id_category, trivia, created_at, updated_at) FROM stdin;
1	Dans quel Pays se trouve les pyramides ?		1	1	\N	\N	\N
2	Quel est le plus grands pays d'afrique ?	\N	3	5	\N	\N	\N
\.


--
-- Data for Name: trophies; Type: TABLE DATA; Schema: public; Owner: romain
--

COPY public.trophies (id, name, description, picture, min_level_to_unlock, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: romain
--

COPY public.users (id, password, email, nickname, level, created_at, updated_at, id_avatar) FROM stdin;
1	toto	toto@mail.com	toto	0	\N	\N	\N
2	tata	tata@mail.com	tata	0	2021-02-09 10:42:03.70476	\N	\N
3	jojo	jojo@gmail.com	jojo	0	2021-02-09 11:34:27.240104	\N	\N
4	Mettre en place l'API TodoList	truc	truc	0	2021-02-09 12:08:09.441529	\N	\N
\.


--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: romain
--

SELECT pg_catalog.setval('public.answers_id_seq', 8, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: romain
--

SELECT pg_catalog.setval('public.category_id_seq', 1, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: romain
--

SELECT pg_catalog.setval('public.questions_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: romain
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: avatars avatars_pkey; Type: CONSTRAINT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.avatars
    ADD CONSTRAINT avatars_pkey PRIMARY KEY (id);


--
-- Name: categories category_pkey; Type: CONSTRAINT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: trophies trophies_pkey; Type: CONSTRAINT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.trophies
    ADD CONSTRAINT trophies_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: romain
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


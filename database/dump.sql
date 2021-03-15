--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN user_id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_user_id_seq;
DROP TABLE IF EXISTS public.users;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(500) NOT NULL,
    user_password character varying(500) NOT NULL,
    user_profile_image character varying(1000000),
    user_header_image character varying(1000000)
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, user_name, user_password, user_profile_image, user_header_image) FROM stdin;
1	@masonksr	pass	\N	\N
3	@mel	1234	\N	\N
5	@guest	guest	\N	\N
6	@jim	1	\N	\N
7	YungMas	pass	\N	\N
8	YungMas2	pass	\N	\N
9	YungMas	pass72b0e492878df74d37d0f5bd315067190e68df73	\N	\N
10	YungMas	pass$2b$10$Z3dLDtiogReYBNOQpfUFP.CLim2.2epo8cj9/H5Icthsg11YgoEgW	\N	\N
11	YungMas	theez$2b$10$hv4l.fqDIyH3eAsJqWJQw.dveU0RvCJQe9L2q0dnjpNUTBRzY3fcS	\N	\N
12	YungMas	$2b$10$rPs4evFu86TCnfa/Hfg8eOyK2mHhLHXed/oNfSScavfTAqL3ssoi6	\N	\N
13	Yu	$2b$10$iG5a88GEAukTof2SMiLkhe4mZ4tz3kdPKkLNAwiwnaQbe2hSoJ3oy	\N	\N
14	Yu	$2b$10$NjXYEpiLuTFLHpCO1Qh40ukwSOldm17w67L6JIMQuscKLeKQ85hrC	\N	\N
15	Ye	$2b$10$MhSHd/4nfXctnos/KmNb5O39qwKMTSdGctHscXYWkQSXmAEoebryK	\N	\N
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 15, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


Table "account" {
  "user_id" int [pk, increment]
  "username" varchar(255) [unique, not null]
  "password" varchar(60) [not null]
  "is_admin" bool [not null, default: false]
  "created_at" timestamp [default: `current_timestamp`]
  "updated_at" timestamp [default: `current_timestamp`]
}

Table "website" {
  "website_id" int [pk, increment]
  "website_uuid" uuid [unique, not null]
  "user_id" int [not null]
  "name" varchar(100) [not null]
  "domain" varchar(500)
  "share_id" varchar(64) [unique]
  "created_at" timestamp [default: `current_timestamp`]

Indexes {
  user_id [name: "website_user_id_idx"]
}
}

Table "session" {
  "session_id" int [pk, increment]
  "session_uuid" uuid [unique, not null]
  "website_id" int [not null]
  "created_at" timestamp [default: `current_timestamp`]
  "hostname" varchar(100)
  "browser" varchar(20)
  "os" varchar(20)
  "device" varchar(20)
  "screen" varchar(11)
  "language" varchar(35)
  "country" char(2)

Indexes {
  created_at [name: "session_created_at_idx"]
  website_id [name: "session_website_id_idx"]
}
}

Table "pageview" {
  "view_id" int [pk, increment]
  "website_id" int [not null]
  "session_id" int [not null]
  "created_at" timestamp [default: `current_timestamp`]
  "url" varchar(500) [not null]
  "referrer" varchar(500)

Indexes {
  created_at [name: "pageview_created_at_idx"]
  website_id [name: "pageview_website_id_idx"]
  session_id [name: "pageview_session_id_idx"]
  (website_id, created_at) [name: "pageview_website_id_created_at_idx"]
  (website_id, session_id, created_at) [name: "pageview_website_id_session_id_created_at_idx"]
}
}

Table "event" {
  "event_id" int [pk, increment]
  "website_id" int [not null]
  "session_id" int [not null]
  "created_at" timestamp [default: `current_timestamp`]
  "url" varchar(500) [not null]
  "event_type" varchar(50) [not null]
  "event_value" varchar(50) [not null]

Indexes {
  created_at [name: "event_created_at_idx"]
  website_id [name: "event_website_id_idx"]
  session_id [name: "event_session_id_idx"]
}
}

Ref:"account"."user_id" < "website"."user_id" [delete: cascade]

Ref:"website"."website_id" < "session"."website_id" [delete: cascade]

Ref:"website"."website_id" < "pageview"."website_id" [delete: cascade]

Ref:"session"."session_id" < "pageview"."session_id" [delete: cascade]

Ref:"website"."website_id" < "event"."website_id" [delete: cascade]

Ref:"session"."session_id" < "event"."session_id" [delete: cascade]

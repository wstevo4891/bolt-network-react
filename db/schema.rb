# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_08_184629) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "credits", force: :cascade do |t|
    t.integer "role", default: 0, null: false
    t.string "contribution"
    t.bigint "movie_id", null: false
    t.bigint "person_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["movie_id"], name: "index_credits_on_movie_id"
    t.index ["person_id"], name: "index_credits_on_person_id"
    t.index ["role"], name: "index_credits_on_role"
  end

  create_table "genres", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.string "alias", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "genres_movies", id: false, force: :cascade do |t|
    t.bigint "genre_id"
    t.bigint "movie_id"
    t.index ["genre_id"], name: "index_genres_movies_on_genre_id"
    t.index ["movie_id"], name: "index_genres_movies_on_movie_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.integer "year", null: false
    t.string "rating", null: false
    t.text "plot", null: false
    t.string "photo"
    t.string "banner"
    t.string "logo"
    t.string "poster"
    t.string "genres_list", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "release_date", null: false
    t.integer "runtime", null: false
  end

  create_table "movies_people", id: false, force: :cascade do |t|
    t.bigint "movie_id"
    t.bigint "person_id"
    t.index ["movie_id"], name: "index_movies_people_on_movie_id"
    t.index ["person_id"], name: "index_movies_people_on_person_id"
  end

  create_table "people", force: :cascade do |t|
    t.string "name"
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role", "name"], name: "index_people_on_role_and_name"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "source", null: false
    t.string "value", null: false
    t.bigint "movie_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["movie_id"], name: "index_reviews_on_movie_id"
  end

  create_table "subgenres", force: :cascade do |t|
    t.string "name"
    t.bigint "genre_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["genre_id"], name: "index_subgenres_on_genre_id"
  end

end

# frozen_string_literal: true

# == Schema Information =======================================================
#
# Table: credits
#
# id            :integer     not null, primary key
# role          :integer     not null
# contribution  :string
# movie_id      :integer     not null, foreign key
# person_id     :integer     not null, foreign key
# created_at    :datetime    not null
# updated_at    :datetime    not null
#
# Indexes =======================================
#
# index_movie_id   (movie_id)
# index_person_id  (person_id)
#
class Credit < ApplicationRecord
  # == Extensions =============================================================
  include MovieRoles::Interface

  # == Relationships ==========================================================
  belongs_to :movie, dependent: :destroy

  belongs_to :person, dependent: :destroy

  # == Validations ============================================================
  validates :movie_id, :person_id, numericality: { only_integer: true }
end

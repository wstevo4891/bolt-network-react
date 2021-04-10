# frozen_string_literal: true

# == Schema Information =======================================================
#
# Table: people
#
# id          :integer     not null, primary key
# name        :string
# role        :integer     not null, default: 0
# created_at  :datetime    not null
# updated_at  :datetime    not null
#
# Indexes =======================================
#
# index_role_name  (role, name)
#
class Person < ApplicationRecord
  # == Extensions =============================================================
  include MovieRoles::Interface

  # == Relationships ==========================================================
  has_and_belongs_to_many :movies

  has_many :credits

  # == Validations ============================================================
  validates :name, presence: true

  # == Class Methods ==========================================================
  def self.search(query)
    return [] unless query.length > 3

    select(:id, :name).match_name(query).limit(5)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.match_name(query)
    match = query.length > 3 ? "%#{query}%" : "#{query}%"

    where('LOWER(name) LIKE ?', match)
  end

  def self.lookup_with_movies(id)
    includes(:movies).find(id)
  end
end

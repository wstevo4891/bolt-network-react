# frozen_string_literal: true

# # Table: reviews
# =============================
#
# - id          :integer     not null, primary key
# - source      :string      not null
# - value       :string      not null
# - movie_id    :integer     not null, foreign key
# - created_at  :datetime    not null
# - updated_at  :datetime    not null
#
# ## Indices
# =============================
#
# - index_movie_id  (movie_id)
#
# =============================
class Review < ApplicationRecord
  # == Relationships ==========================================================
  belongs_to :movie, dependent: :destroy

  # == Validations ============================================================
  validates :source, :value, presence: true

  validates :movie_id, numericality: { only_integer: true }
end

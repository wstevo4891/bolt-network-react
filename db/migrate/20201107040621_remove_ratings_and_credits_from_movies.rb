class RemoveRatingsAndCreditsFromMovies < ActiveRecord::Migration[5.2]
  TABLE = :movies

  def change
    change_table TABLE do |t|
      t.remove :ratings, :actors, :directors, :writers
      t.rename :rated, :rating
    end

    change_column TABLE, :rating, :string, null: false
  end
end

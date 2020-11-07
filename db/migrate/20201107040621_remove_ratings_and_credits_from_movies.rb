class RemoveRatingsAndCreditsFromMovies < ActiveRecord::Migration[5.2]
  def change
    change_table :movies do |t|
      t.remove :ratings, :actors, :directors, :writers
      t.rename :rated, :rating
    end
  end
end

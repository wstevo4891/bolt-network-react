class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string   :title
      t.string   :slug
      t.string   :year
      t.string   :rated
      t.string   :release_date
      t.string   :run_time
      t.string   :directors, array: true, default: []
      t.string   :writers, array: true, default: []
      t.string   :actors, array: true, default: []
      t.string   :plot
      t.string   :photo
      t.string   :banner
      t.string   :logo
      t.string   :poster
      t.json     :ratings
      t.string   :genres_list, array: true, default: []

      t.timestamps null: false
    end
  end
end

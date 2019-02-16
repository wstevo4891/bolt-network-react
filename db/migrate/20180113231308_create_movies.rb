class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string   :title
      t.string   :year
      t.string   :rated
      t.string   :release_date
      t.string   :run_time
      t.string   :directors, array: true, default: []
      t.string   :writers, array: true, default: []
      t.string   :actors, array: true, default: []
      t.string   :plot
      t.string   :photo
      t.string   :poster
      t.json     :ratings

      t.timestamps null: false
    end
  end
end

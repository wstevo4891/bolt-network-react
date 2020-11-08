class ChangeReleaseDateOnMovies < ActiveRecord::Migration[5.2]
  def change
    change_table :movies do |t|
      t.remove :release_date
      t.date   :release_date, null: false
    end
  end
end

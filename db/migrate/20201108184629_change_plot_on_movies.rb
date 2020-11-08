class ChangePlotOnMovies < ActiveRecord::Migration[5.2]
  def change
    change_column :movies, :plot, :text, null: false
  end
end

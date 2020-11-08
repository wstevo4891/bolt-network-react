class ChangeRuntimeOnMovies < ActiveRecord::Migration[5.2]
  def change
    change_table :movies do |t|
      t.remove :run_time
      t.integer :runtime, null: false
    end
  end
end

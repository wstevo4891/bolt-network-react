class CreateGenres < ActiveRecord::Migration[5.1]
  def change
    create_table :genres do |t|
      t.string :title
      t.string :slug
      t.string :alias

      t.timestamps null: false
    end
  end
end

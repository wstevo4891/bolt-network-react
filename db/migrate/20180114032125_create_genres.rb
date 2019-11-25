class CreateGenres < ActiveRecord::Migration[5.1]
  def change
    create_table :genres do |t|
      t.string :name
      t.string :slug
      t.string :plural
      t.string :category

      t.timestamps null: false
    end
  end
end

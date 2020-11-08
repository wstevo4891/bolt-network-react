class CreateGenres < ActiveRecord::Migration[5.1]
  def change
    create_table :genres do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.string :alias, null: false

      t.timestamps null: false
    end
  end
end

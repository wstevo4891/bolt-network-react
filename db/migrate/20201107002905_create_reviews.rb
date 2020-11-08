class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string     :source, null: false
      t.string     :value,  null: false
      t.belongs_to :movie,  index: true, null: false

      t.timestamps null: false
    end
  end
end

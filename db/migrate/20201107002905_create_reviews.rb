class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.source :string, null: false
      t.value  :string, null: false
      t.belongs_to :movie, index: true, null: false

      t.timestamps null: false
    end
  end
end

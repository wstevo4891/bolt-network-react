class CreateCredits < ActiveRecord::Migration[5.2]
  def change
    create_table :credits do |t|
      t.integer    :role, index: true, null: false, default: 0
      t.string     :contribution
      t.belongs_to :movie, index: true, null: false
      t.belongs_to :person, index: true, null: false

      t.timestamps null: false
    end
  end
end

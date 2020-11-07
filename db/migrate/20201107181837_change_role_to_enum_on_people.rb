class ChangeRoleToEnumOnPeople < ActiveRecord::Migration[5.2]
  def change
    change_column :people, :role, :integer, index: true, null: false, default: 0
  end
end

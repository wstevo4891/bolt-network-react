# frozen_string_literal: true

module CleanDatabase
  extend ActiveSupport::Concern

  ERROR_MESSAGE = %( Not an ActiveRecord model )

  def clean_database(*models)
    models.each do |model|
      raise ERROR_MESSAGE unless model.respond_to(:delete_all!)

      model.unscoped { model.delete_all! }
    end
  end
end

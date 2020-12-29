# frozen_string_literal: true

require 'rails_helper'

describe Person, type: :model do
  before :each do
    clean_database Person, Movie, Credit
  end

  after :all do
    clean_database Person, Movie, Credit
  end

  describe 'associations' do
    subject { create(:person, traits: [:with_movies]) }

    
  end
end

# frozen_string_literal: true

require 'rails_helper'

describe Genre, type: :model do
  before :each do
    clean_database Genre, Movie
  end

  after :all do
    clean_database Genre, Movie
  end

  describe 'associations' do
    subject { create(:genre_with_movies) }

    it { is_expected.to have_many(:movies) }

    it { is_expected.to belong_to(:movie) }
  end

  describe 'validations' do
    subject { build_stubbed(:genre) }

    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    it 'is invalid without a title' do
      subject.title = nil
      expect(subject).to_not be_valid
    end

    it 'is invalid without a slug' do
      subject.slug = nil
      expect(subject).to_not be_valid
    end

    it 'is invalid without an alias' do
      subject.alias = nil
      expect(subject).to_not be_valid
    end
  end

  describe '.search' do
    before :each do
      create_list(:genre, 3)
    end

    it 'should find genre with one character' do
      results = Genre.search('g')

      expect(results).not_to be_empty
    end

    it 'should find genre by title' do
      results = Genre.search('genre 1')

      expect(results).not_to be_empty
    end

    it 'should find genre by alias' do
      results = Genre.search('genre 1 movies')

      expect(results).not_to be_empty
    end

    context 'when no results are found' do
      it 'should return an empty array' do
        results = Genre.search('foobar')

        expect(results).to be_empty
      end
    end
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Genre, type: :model do
  subject { described_class.new }

  it 'is valid with valid attributes' do
    subject.title = 'Action'
    subject.slug = 'action'
    subject.alias = 'Action Movies'

    expect(subject).to be_valid
  end
end

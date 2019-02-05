# app/services/omdb_api/client.rb

module OmdbApi
  class Client
    # == Constants ==============================================================
    API_PATH = URI('http://www.omdbapi.com/').freeze

    # == Attributes =============================================================
    attr_reader :api_key, :api_path, :request_url

    # == Class Methods ==========================================================

    # == Instance Methods =======================================================
    def initialize
      @api_key = ENV['OMDB_API_KEY']
      @api_path = API_PATH
    end

    def fetch_movie(params)
      url = build_url(params)
      ApiRequest.new(client: self).get(url)
    end

    def find_movie(params)
      params[:apikey] = api_key
      ApiRequest.new(client: self).post(params)
    end

    private

    def build_url(params)
      full_url = api_path.to_s + "?apikey=#{api_key}"

      params.each do |key, value|
        full_url.concat "&#{key}=#{value.tr(' ', '+')}"
      end

      full_url
    end
  end
end

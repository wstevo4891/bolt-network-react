# frozen_string_literal: true

module OmdbApi
  ##
  # Service for processing API requests to OMDB
  class ApiRequest
    HEADERS = {
      'Content-Type' => 'application/json'
    }.freeze

    delegate :api_key, :api_path, to: :@client

    delegate :hostname, :port, to: :api_path

    def initialize(client: nil)
      @client = client
    end

    def get(url)
      request = get_request(url)
      response = send_request(request)
      parse_response(response)
    end

    def post(params)
      request = post_request(params)
      response = send_request(request)
      parse_response(response)
    end

    protected

    def api_root
      api_path.to_s
    end

    private

    def get_request(url)
      Net::HTTP::Get.new(url, HEADERS)
    end

    def post_request(data)
      req = Net::HTTP::Post.new(api_path, HEADERS)
      req.body = JSON.generate(data)
      req
    end

    def send_request(request)
      # Net::HTTP.start(hostname, port, use_ssl: true) do |http|
      #   http.request(request)
      # end
      Net::HTTP.start(hostname, port) do |http|
        http.request(request)
      end
    rescue StandardError => e
      puts 'An error occurred while sending this request'
      Rails.logger.error 'An error occurred while sending this request'
      handle_error(e)
    end

    # Eval and parse http response
    def parse_response(response)
      return response unless response.respond_to?(:body)

      JSON.parse(response.body, symbolize_names: true)
    rescue StandardError => e
      puts "Error parsing response from #{api_path}"
      Rails.logger.error "Error parsing response from #{api_path}"
      handle_error(e)
    end

    def handle_error(err)
      puts err.message
      puts err.backtrace.join("\n")
      Rails.logger.error "#{err.message}\n#{err.backtrace.join("\n")}"
      { error: err.message }
    end
  end
end

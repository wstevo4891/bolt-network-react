# app/services/omdb_api/api_request.rb

module OmdbApi
  ##
  # Service for processing API requests to OMDB
  #
  class ApiRequest
    HEADERS = {
      'Content-Type' => 'application/json'
    }.freeze

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

    def api_key
      @client.api_key
    end

    def api_path
      @client.api_path
    end

    def api_root
      @client.api_path.to_s
    end

    def hostname
      @client.api_path.hostname
    end

    def port
      @client.api_path.port
    end

    private

    def get_request(url)
      req = Net::HTTP::Get.new(url, HEADERS)
      req
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

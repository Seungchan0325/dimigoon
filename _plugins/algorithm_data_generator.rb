require 'yaml'

module Jekyll
  class AlgorithmDataGenerator < Generator
    safe true
    priority :highest

    def generate(site)
      # _algorithms 디렉토리에서 알고리즘 데이터 수집하여 사이트 데이터에 저장
      site.data['algorithms'] = collect_algorithms_data(site)
    end

    private

    def collect_algorithms_data(site)
      algorithms_dir = File.join(site.source, '_algorithms')
      return {} unless Dir.exist?(algorithms_dir)

      data = {}
      
      # 티어 디렉토리들을 순회
      Dir.entries(algorithms_dir).each do |tier_entry|
        next if tier_entry.start_with?('.')
        
        tier_path = File.join(algorithms_dir, tier_entry)
        next unless File.directory?(tier_path)
        
        tier_name = tier_entry.downcase
        data[tier_name] = {}
        
        # 카테고리 디렉토리들을 순회
        Dir.entries(tier_path).each do |category_entry|
          next if category_entry.start_with?('.')
          
          category_path = File.join(tier_path, category_entry)
          next unless File.directory?(category_path)
          
          category_name = format_category_name(category_entry)
          algorithms = collect_category_algorithms(site, category_path, tier_name, category_entry)
          
          if algorithms.any?
            data[tier_name][category_name] = algorithms
          end
        end
      end
      
      data
    end

    def collect_category_algorithms(site, category_path, tier, category_key)
      algorithms = []
      
      # .md 파일들을 순회
      Dir.glob(File.join(category_path, '*.md')).each do |file_path|
        algorithm_data = parse_algorithm_file(file_path, tier, category_key)
        algorithms << algorithm_data if algorithm_data
      end
      
      algorithms.sort_by { |alg| alg['title'] }
    end

    def parse_algorithm_file(file_path, tier, category_key)
      begin
        content = File.read(file_path)
        
        # Front matter 파싱
        if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
          front_matter = YAML.safe_load($1)
          
          filename = File.basename(file_path, '.md')
          
          {
            'title' => front_matter['title'] || format_title_from_filename(filename),
            'description' => front_matter['description'] || '자동 생성된 알고리즘 설명',
            'link' => "/algorithms/#{tier}/#{category_key}/#{filename}/",
            'difficulty' => front_matter['difficulty'],
            'tags' => front_matter['tags'] || [],
            'source_file' => file_path
          }
        else
          # Front matter가 없는 경우
          filename = File.basename(file_path, '.md')
          
          {
            'title' => format_title_from_filename(filename),
            'description' => '자동 생성된 알고리즘 설명',
            'link' => "/algorithms/#{tier}/#{category_key}/#{filename}/",
            'tags' => [],
            'source_file' => file_path
          }
        end
      rescue => e
        Jekyll.logger.warn "Algorithm Generator", "Failed to parse #{file_path}: #{e.message}"
        nil
      end
    end

    def format_category_name(category_key)
      case category_key.downcase
      when 'dp'
        'Dynamic Programming (DP)'
      when 'graph'
        'Graph'
      when 'search'
        'Search'
      when 'sort'
        'Sorting'
      when 'string'
        'String'
      when 'math'
        'Mathematics'
      when 'geometry'
        'Geometry'
      when 'greedy'
        'Greedy'
      when 'implementation'
        'Implementation'
      when 'bruteforce'
        'Brute Force'
      when 'backtracking'
        'Backtracking'
      when 'query'
        'Query Processing'
      when 'tree'
        'Tree'
      when 'data_structure', 'ds'
        'Data Structure'
      when 'number_theory'
        'Number Theory'
      when 'combinatorics'
        'Combinatorics'
      when 'flow'
        'Network Flow'
      when 'segment_tree'
        'Segment Tree'
      when 'binary_search'
        'Binary Search'
      when 'two_pointer'
        'Two Pointer'
      when 'divide_conquer'
        'Divide and Conquer'
      else
        # 기본적으로 첫 글자 대문자로 변환하고 언더스코어를 공백으로 변경
        category_key.split('_').map(&:capitalize).join(' ')
      end
    end

    def format_title_from_filename(filename)
      # 파일명에서 제목 생성 (언더스코어를 공백으로, 첫 글자 대문자)
      filename.split('_').map(&:capitalize).join(' ')
    end
  end
end

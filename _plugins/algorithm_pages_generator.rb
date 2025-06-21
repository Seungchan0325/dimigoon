module Jekyll
  class AlgorithmPagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # _algorithms 디렉토리에서 .md 파일들을 찾아 페이지 생성
      generate_algorithm_pages(site)
    end

    private

    def generate_algorithm_pages(site)
      algorithms_dir = File.join(site.source, '_algorithms')
      return unless Dir.exist?(algorithms_dir)

      # 티어별로 순회
      Dir.entries(algorithms_dir).each do |tier_entry|
        next if tier_entry.start_with?('.')
        
        tier_path = File.join(algorithms_dir, tier_entry)
        next unless File.directory?(tier_path)
        
        tier_name = tier_entry.downcase
        
        # 카테고리별로 순회
        Dir.entries(tier_path).each do |category_entry|
          next if category_entry.start_with?('.')
          
          category_path = File.join(tier_path, category_entry)
          next unless File.directory?(category_path)
          
          # .md 파일들을 찾아 페이지 생성
          Dir.glob(File.join(category_path, '*.md')).each do |file_path|
            generate_algorithm_page(site, file_path, tier_name, category_entry)
          end
        end
      end
    end

    def generate_algorithm_page(site, file_path, tier, category)
      filename = File.basename(file_path, '.md')
      
      # 알고리즘 페이지 생성
      page = AlgorithmPage.new(site, site.source, "algorithms/#{tier}/#{category}", "#{filename}.html")
      
      # 원본 파일 내용 읽기
      content = File.read(file_path)
      
      # Front matter 파싱
      if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
        front_matter = YAML.safe_load($1)
        markdown_content = content.sub(/\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m, '')
      else
        front_matter = {}
        markdown_content = content
      end
      
      # 페이지 데이터 설정
      page.data['layout'] = 'algorithm'
      page.data['title'] = front_matter['title'] || format_title_from_filename(filename)
      page.data['description'] = front_matter['description'] || '알고리즘 학습 자료'
      page.data['tier'] = tier
      page.data['category'] = category
      page.data['difficulty'] = front_matter['difficulty']
      page.data['tags'] = front_matter['tags'] || []
      page.data['algorithm_page'] = true
      
      # 네비게이션 정보 추가
      page.data['breadcrumb'] = [
        { 'title' => '알고리즘', 'url' => '/algorithms/' },
        { 'title' => tier.capitalize, 'url' => "/algorithms/##{tier}-section" },
        { 'title' => format_category_name(category), 'url' => nil },
        { 'title' => page.data['title'], 'url' => nil }
      ]
      
      # 마크다운 콘텐츠를 페이지 콘텐츠로 설정
      page.content = markdown_content
      
      site.pages << page
    end

    def format_title_from_filename(filename)
      filename.split('_').map(&:capitalize).join(' ')
    end

    def format_category_name(category_key)
      case category_key.downcase
      when 'dp'
        'Dynamic Programming'
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
        category_key.split('_').map(&:capitalize).join(' ')
      end
    end
  end

  class AlgorithmPage < Page
    def initialize(site, base, dir, name)
      @site = site
      @base = base
      @dir = dir
      @name = name

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'default.html')
    end
  end
end

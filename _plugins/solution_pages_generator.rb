module Jekyll
  class SolutionPagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Solutions 메인 인덱스 페이지 생성
      generate_solutions_index(site)
      
      # 올림피아드별 페이지 생성
      generate_olympiad_pages(site)
      
      # 대회별 페이지 생성
      generate_contest_pages(site)
    end

    private

    def generate_solutions_index(site)
      # Solutions 메인 페이지 생성
      page = SolutionPage.new(site, site.source, "solutions", "index.html")
      page.data['layout'] = 'solutions'
      page.data['title'] = '문제 풀이'
      page.data['description'] = '정보 올림피아드 문제 풀이 모음'
      page.content = ""
      
      site.pages << page
    end

    def generate_olympiad_pages(site)
      # _solutions에서 올림피아드 목록 추출
      olympiads = site.collections['solutions'].docs.map { |doc| doc.data['olympiad'] }.uniq.compact
      
      olympiads.each do |olympiad|
        # 올림피아드 정보 설정
        olympiad_info = get_olympiad_info(olympiad)
        
        # 올림피아드 페이지 생성
        page = SolutionPage.new(site, site.source, "solutions", "#{olympiad}.html")
        page.data['layout'] = 'olympiad'
        page.data['title'] = olympiad_info[:title]
        page.data['description'] = olympiad_info[:description]
        page.data['olympiad_key'] = olympiad
        page.content = ""
        
        site.pages << page
      end
    end

    def generate_contest_pages(site)
      # _solutions에서 올림피아드별 연도 추출
      contests = {}
      site.collections['solutions'].docs.each do |doc|
        olympiad = doc.data['olympiad']
        year = doc.data['year']
        
        next unless olympiad && year
        
        contests[olympiad] ||= {}
        contests[olympiad][year] ||= {
          problems: [],
          location: doc.data['location'],
          description: doc.data['description']
        }
        
        contests[olympiad][year][:problems] << doc
      end
      
      # 각 대회별 페이지 생성
      contests.each do |olympiad, years|
        years.each do |year, contest_data|
          # 대회 정보 설정
          contest_info = get_contest_info(olympiad, year, contest_data)
          
          # 대회 페이지 생성
          page = SolutionPage.new(site, site.source, "solutions/#{olympiad}", "#{year}.html")
          page.data['layout'] = 'contest'
          page.data['title'] = contest_info[:title]
          page.data['olympiad'] = olympiad
          page.data['year'] = year
          page.data['location'] = contest_info[:location]
          page.data['description'] = contest_info[:description]
          page.content = contest_info[:content]
          
          site.pages << page
        end
      end
    end

    def get_olympiad_info(olympiad)
      case olympiad
      when 'apio'
        {
          title: 'APIO',
          description: 'Asia-Pacific Informatics Olympiad 문제 풀이 모음'
        }
      when 'koi'
        {
          title: 'KOI',
          description: 'Korea Olympiad in Informatics 문제 풀이 모음'
        }
      else
        {
          title: olympiad.upcase,
          description: "#{olympiad.upcase} 문제 풀이 모음"
        }
      end
    end

    def get_contest_info(olympiad, year, contest_data)
      case olympiad
      when 'apio'
        {
          title: "APIO #{year}",
          location: contest_data[:location] || get_default_location(olympiad, year),
          description: contest_data[:description] || "#{year}년 아시아-태평양 정보 올림피아드",
          content: generate_contest_content(olympiad, year, contest_data)
        }
      when 'koi'
        {
          title: "KOI #{year}",
          location: contest_data[:location] || "대한민국",
          description: contest_data[:description] || "#{year}년 한국정보올림피아드",
          content: generate_contest_content(olympiad, year, contest_data)
        }
      else
        {
          title: "#{olympiad.upcase} #{year}",
          location: contest_data[:location] || "",
          description: contest_data[:description] || "#{year}년 #{olympiad.upcase}",
          content: generate_contest_content(olympiad, year, contest_data)
        }
      end
    end

    def get_default_location(olympiad, year)
      # 기본 개최지 정보 (실제 데이터로 교체 가능)
      case olympiad
      when 'apio'
        case year
        when 2023
          "이집트 카이로"
        when 2022
          "온라인"
        else
          "아시아-태평양 지역"
        end
      when 'koi'
        "대한민국"
      else
        ""
      end
    end

    def generate_contest_content(olympiad, year, contest_data)
      problems = contest_data[:problems]
      problem_count = problems.length
      
      content = ""
      
      case olympiad
      when 'apio'
        content += "#{year}년 아시아-태평양 정보 올림피아드"
        content += contest_data[:location] ? "는 #{contest_data[:location]}에서 개최되었습니다.\n\n" : "입니다.\n\n"
        
        content += "## 대회 정보\n\n"
        content += "- **일시**: #{year}년\n"
        content += "- **장소**: #{contest_data[:location] || '아시아-태평양 지역'}\n"
        content += "- **문제 수**: #{problem_count}문제\n"
        content += "- **시간**: 5시간\n\n"
        
        if problem_count > 0
          content += "## 출제 경향\n\n"
          content += "#{year}년 APIO는 다음과 같은 특징을 보였습니다:\n\n"
          
          # 문제별 태그 분석
          all_tags = problems.flat_map { |p| p.data['tags'] || [] }.uniq
          all_tags.each_with_index do |tag, i|
            content += "#{i + 1}. **#{tag}**: 관련 알고리즘과 자료구조\n"
          end
        end
        
      when 'koi'
        content += "#{year}년 한국정보올림피아드"
        content += contest_data[:location] ? "는 #{contest_data[:location]}에서 개최되었습니다.\n\n" : "입니다.\n\n"
        
        content += "## 대회 정보\n\n"
        content += "- **일시**: #{year}년\n"
        content += "- **장소**: #{contest_data[:location] || '대한민국'}\n"
        content += "- **문제 수**: #{problem_count}문제\n\n"
      else
        content += "#{year}년 #{olympiad.upcase}입니다.\n\n"
        content += "## 대회 정보\n\n"
        content += "- **일시**: #{year}년\n"
        content += "- **문제 수**: #{problem_count}문제\n\n"
      end
      
      content
    end
  end

  class SolutionPage < Page
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

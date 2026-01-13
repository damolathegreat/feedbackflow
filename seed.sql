-- Seed script for FeedbackFlow
-- 100 items: Twitter(25), Discord(20), GitHub(20), Support(20), Email(15)
-- Sentiments: 50 positive, 35 neutral, 15 negative
-- Themes: billing, documentation, performance, features, bugs, security

-- Twitter Feedback (25 items) - Source ID: 1
-- Positive (12)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(1, 'Sarah Chen', '@sarahcodes', 'Just migrated our entire backend to @feedbackflow and the performance gains are incredible! 3x faster response times. Highly recommend!', 'positive', 0.95, 'reviewed', 'normal', datetime('now', '-2 hours')),
(1, 'Mike Rodriguez', '@mikedev', 'The new dashboard UI is absolutely beautiful. Clean, fast, and intuitive. Great work team!', 'positive', 0.92, 'new', 'normal', datetime('now', '-5 hours')),
(1, 'Emma Wilson', '@emmawilson', 'Finally a tool that gets documentation right. Everything I need is exactly where I expect it to be.', 'positive', 0.88, 'new', 'normal', datetime('now', '-8 hours')),
(1, 'David Park', '@davidpark_dev', 'Customer support responded in 5 minutes and solved my billing issue immediately. This is how it should be done!', 'positive', 0.94, 'actioned', 'normal', datetime('now', '-12 hours')),
(1, 'Lisa Thompson', '@lisatech', 'The security features in the latest release are top-notch. SOC2 compliance made easy!', 'positive', 0.91, 'reviewed', 'normal', datetime('now', '-1 day')),
(1, 'James Lee', '@jameslee', 'Been using this for 6 months now. Best investment we made for our startup. The ROI is insane.', 'positive', 0.93, 'new', 'normal', datetime('now', '-1 day')),
(1, 'Anna Martinez', '@annam', 'Love the new webhook integrations! Makes our workflow so much smoother.', 'positive', 0.87, 'new', 'normal', datetime('now', '-2 days')),
(1, 'Chris Brown', '@chrisbrown_io', 'The API documentation is chef''s kiss. Got our integration running in under an hour.', 'positive', 0.89, 'reviewed', 'normal', datetime('now', '-2 days')),
(1, 'Rachel Green', '@rachelg', 'Switched from competitor and saving $500/month with better features. No brainer!', 'positive', 0.90, 'new', 'normal', datetime('now', '-3 days')),
(1, 'Tom Anderson', '@tomand', 'The performance monitoring dashboard helped us identify a critical bottleneck. Saved our launch!', 'positive', 0.92, 'actioned', 'normal', datetime('now', '-3 days')),
(1, 'Nicole White', '@nicolewhite', 'Just discovered the bulk import feature. Migrated 50k records in minutes!', 'positive', 0.86, 'new', 'normal', datetime('now', '-4 days')),
(1, 'Kevin Zhang', '@kevinz', 'The team collaboration features are exactly what we needed. Goodbye spreadsheets!', 'positive', 0.88, 'new', 'normal', datetime('now', '-4 days'));

-- Neutral (8)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(1, 'Alex Turner', '@alexturner', 'Updated to the latest version. Some UI changes to get used to but functionality seems the same.', 'neutral', 0.52, 'new', 'normal', datetime('now', '-5 days')),
(1, 'Maria Garcia', '@mariag', 'Does anyone know if there''s a way to export reports to PDF? Can''t find it in the docs.', 'neutral', 0.48, 'new', 'normal', datetime('now', '-5 days')),
(1, 'Brian Miller', '@brianm', 'Comparing pricing tiers for our team. The enterprise plan has a lot of features we might not need.', 'neutral', 0.50, 'new', 'normal', datetime('now', '-6 days')),
(1, 'Jennifer Davis', '@jenniferd', 'Interesting approach to the analytics. Different from what I''m used to but seems comprehensive.', 'neutral', 0.55, 'new', 'normal', datetime('now', '-6 days')),
(1, 'Ryan Scott', '@ryanscott', 'Looking into migrating from our current solution. Anyone have experience with the migration process?', 'neutral', 0.51, 'new', 'normal', datetime('now', '-7 days')),
(1, 'Ashley Moore', '@ashleym', 'The mobile app is functional but could use some polish. Desktop version is much better.', 'neutral', 0.45, 'reviewed', 'normal', datetime('now', '-7 days')),
(1, 'Daniel Kim', '@danielk', 'Attended the webinar yesterday. Some useful tips but mostly stuff already in the docs.', 'neutral', 0.48, 'new', 'normal', datetime('now', '-8 days')),
(1, 'Stephanie Clark', '@stephc', 'Feature request: would love to see dark mode for the dashboard. Eyes getting tired!', 'neutral', 0.53, 'new', 'normal', datetime('now', '-8 days'));

-- Negative (5)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(1, 'Mark Johnson', '@markj', 'Third time this week the API has had latency issues. Really affecting our production environment.', 'negative', 0.25, 'new', 'high', datetime('now', '-1 day')),
(1, 'Patricia Lewis', '@patricial', 'Billing charged me twice this month. Support ticket open for 3 days with no response. Frustrating!', 'negative', 0.18, 'new', 'urgent', datetime('now', '-2 days')),
(1, 'George Wilson', '@georgew', 'Documentation for the new API endpoints is severely lacking. Wasted hours figuring out auth flow.', 'negative', 0.28, 'reviewed', 'high', datetime('now', '-4 days')),
(1, 'Sandra Taylor', '@sandrat', 'The latest update broke our custom integration. No changelog warning about breaking changes.', 'negative', 0.22, 'new', 'high', datetime('now', '-5 days')),
(1, 'Robert Brown', '@robertb', 'Security vulnerability we reported 2 weeks ago still not patched. This is unacceptable for enterprise.', 'negative', 0.15, 'new', 'urgent', datetime('now', '-6 days'));

-- Discord Feedback (20 items) - Source ID: 2
-- Positive (10)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(2, 'CloudNinja', 'cloudninja#1234', 'Just deployed my first project using the CLI. The developer experience is fantastic! Everything just works.', 'positive', 0.91, 'new', 'normal', datetime('now', '-3 hours')),
(2, 'DevMaster', 'devmaster#5678', 'The community here is amazing. Got help with my edge case in under 10 minutes. You guys rock!', 'positive', 0.93, 'new', 'normal', datetime('now', '-6 hours')),
(2, 'StackOverflow', 'stackoverflow#9012', 'Performance benchmarks are impressive. We''re seeing 50ms p99 latencies globally.', 'positive', 0.89, 'reviewed', 'normal', datetime('now', '-10 hours')),
(2, 'ByteCoder', 'bytecoder#3456', 'The new caching layer is a game changer. Our costs dropped 40% this month!', 'positive', 0.94, 'new', 'normal', datetime('now', '-1 day')),
(2, 'TechLead', 'techlead#7890', 'Documentation team deserves a raise. The new tutorials are incredibly well written.', 'positive', 0.90, 'new', 'normal', datetime('now', '-1 day')),
(2, 'CodeWizard', 'codewizard#2345', 'Finally got around to implementing the webhooks. So much cleaner than polling!', 'positive', 0.86, 'new', 'normal', datetime('now', '-2 days')),
(2, 'ServerSam', 'serversam#6789', 'The debugging tools saved me hours today. Stack traces are actually readable now!', 'positive', 0.88, 'new', 'normal', datetime('now', '-3 days')),
(2, 'DataDan', 'datadan#0123', 'Migration from AWS was smoother than expected. Great migration guide!', 'positive', 0.87, 'reviewed', 'normal', datetime('now', '-4 days')),
(2, 'APIQueen', 'apiqueen#4567', 'The rate limiting is so well implemented. No more worrying about runaway scripts.', 'positive', 0.85, 'new', 'normal', datetime('now', '-5 days')),
(2, 'FullStack', 'fullstack#8901', 'TypeScript support is first-class. Autocomplete works perfectly with the SDK.', 'positive', 0.92, 'new', 'normal', datetime('now', '-6 days'));

-- Neutral (7)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(2, 'NewbieDev', 'newbiedev#1111', 'Hey everyone, just joined. Is there a getting started guide for complete beginners?', 'neutral', 0.50, 'new', 'normal', datetime('now', '-2 hours')),
(2, 'CuriousCat', 'curiouscat#2222', 'What''s the difference between the Pro and Enterprise tiers? Pricing page isn''t super clear.', 'neutral', 0.48, 'new', 'normal', datetime('now', '-8 hours')),
(2, 'BuilderBot', 'builderbot#3333', 'Anyone know if there''s a way to customize the error pages? Looking through the docs now.', 'neutral', 0.52, 'new', 'normal', datetime('now', '-1 day')),
(2, 'QueryKing', 'queryking#4444', 'The query syntax is different from what I''m used to. Not bad, just different.', 'neutral', 0.49, 'new', 'normal', datetime('now', '-2 days')),
(2, 'TestTom', 'testtom#5555', 'Running some load tests this week. Will share results when done.', 'neutral', 0.51, 'new', 'normal', datetime('now', '-3 days')),
(2, 'ScriptKid', 'scriptkid#6666', 'Is Python SDK on the roadmap? Currently using REST API directly.', 'neutral', 0.53, 'reviewed', 'normal', datetime('now', '-4 days')),
(2, 'ConfigCarl', 'configcarl#7777', 'The config file format changed between versions. Had to update our CI pipeline.', 'neutral', 0.46, 'new', 'normal', datetime('now', '-5 days'));

-- Negative (3)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(2, 'FrustratedFred', 'frustratedfred#8888', 'Been stuck on this auth issue for 2 days. The error messages are completely unhelpful.', 'negative', 0.24, 'new', 'high', datetime('now', '-1 day')),
(2, 'BugHunter', 'bughunter#9999', 'Found a pretty serious bug in the batch processing. Data gets corrupted with special characters.', 'negative', 0.20, 'new', 'urgent', datetime('now', '-3 days')),
(2, 'AngryAdmin', 'angryadmin#0000', 'The dashboard keeps logging me out every 30 minutes. Super annoying when doing long config sessions.', 'negative', 0.28, 'reviewed', 'high', datetime('now', '-5 days'));

-- GitHub Feedback (20 items) - Source ID: 3
-- Positive (10)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(3, 'octocat', '@octocat', 'Excellent PR! The refactoring of the authentication module makes the code so much cleaner. LGTM!', 'positive', 0.91, 'actioned', 'normal', datetime('now', '-4 hours')),
(3, 'codereview', '@codereview', 'This fix for issue #234 is perfect. Great test coverage too. Merging now.', 'positive', 0.89, 'actioned', 'normal', datetime('now', '-8 hours')),
(3, 'opensourcer', '@opensourcer', 'Thank you for adding TypeScript definitions! This will help so many people.', 'positive', 0.93, 'new', 'normal', datetime('now', '-12 hours')),
(3, 'contributor', '@contributor', 'The new plugin architecture is beautifully designed. Very extensible!', 'positive', 0.90, 'reviewed', 'normal', datetime('now', '-1 day')),
(3, 'reviewer', '@reviewer', 'Security improvements in v2.3.0 are solid. The input sanitization is much better now.', 'positive', 0.88, 'new', 'normal', datetime('now', '-2 days')),
(3, 'maintainer', '@maintainer', 'Great documentation update! The examples are really helpful for newcomers.', 'positive', 0.87, 'new', 'normal', datetime('now', '-3 days')),
(3, 'devops_pro', '@devops_pro', 'The new CI/CD templates are fantastic. Saved us hours of configuration.', 'positive', 0.92, 'new', 'normal', datetime('now', '-4 days')),
(3, 'bugfixer', '@bugfixer', 'Memory leak fixed in #456. Great debugging work tracking this down!', 'positive', 0.86, 'actioned', 'normal', datetime('now', '-5 days')),
(3, 'performance_guru', '@performance_guru', 'The query optimization in this PR reduced our DB load by 60%. Amazing work!', 'positive', 0.95, 'actioned', 'normal', datetime('now', '-6 days')),
(3, 'api_designer', '@api_designer', 'RESTful endpoint design follows best practices. Clean and consistent.', 'positive', 0.84, 'reviewed', 'normal', datetime('now', '-7 days'));

-- Neutral (7)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(3, 'questioner', '@questioner', 'Is this the right approach for handling concurrent requests? Opened for discussion.', 'neutral', 0.50, 'new', 'normal', datetime('now', '-6 hours')),
(3, 'curious_dev', '@curious_dev', 'What''s the reasoning behind using SQLite instead of PostgreSQL for this feature?', 'neutral', 0.52, 'new', 'normal', datetime('now', '-1 day')),
(3, 'doc_reader', '@doc_reader', 'The README mentions a config option that doesn''t seem to exist anymore. Needs update.', 'neutral', 0.48, 'new', 'normal', datetime('now', '-2 days')),
(3, 'tester', '@tester', 'Test coverage is at 78%. Should we aim for 80% before merging?', 'neutral', 0.51, 'new', 'normal', datetime('now', '-3 days')),
(3, 'versioner', '@versioner', 'Should this be a minor or patch version bump? The changes seem significant.', 'neutral', 0.49, 'new', 'normal', datetime('now', '-4 days')),
(3, 'dependency_bot', '@dependency_bot', 'Several dependencies have updates available. Created tracking issue #789.', 'neutral', 0.50, 'new', 'normal', datetime('now', '-5 days')),
(3, 'style_checker', '@style_checker', 'Code style is inconsistent with the rest of the codebase. Minor formatting needed.', 'neutral', 0.47, 'reviewed', 'normal', datetime('now', '-6 days'));

-- Negative (3)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(3, 'security_audit', '@security_audit', 'CRITICAL: SQL injection vulnerability found in user input handler. See line 234.', 'negative', 0.12, 'new', 'urgent', datetime('now', '-2 hours')),
(3, 'regression_finder', '@regression_finder', 'This PR breaks backward compatibility. Existing integrations will fail without warning.', 'negative', 0.22, 'new', 'high', datetime('now', '-1 day')),
(3, 'perf_tester', '@perf_tester', 'Performance regression detected. Response times increased 300% with this change.', 'negative', 0.18, 'new', 'high', datetime('now', '-3 days'));

-- Support Feedback (20 items) - Source ID: 4
-- Positive (10)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(4, 'John Smith', 'john.smith@company.com', 'Your support team is incredible! Sarah helped me resolve a complex billing issue in one call. She went above and beyond to ensure everything was correct. Thank you!', 'positive', 0.96, 'actioned', 'normal', datetime('now', '-1 hour')),
(4, 'Emily Davis', 'emily.davis@startup.io', 'The onboarding session was extremely helpful. Our team is now fully up to speed and productive. Best enterprise onboarding experience I''ve had.', 'positive', 0.93, 'reviewed', 'normal', datetime('now', '-4 hours')),
(4, 'Michael Brown', 'mbrown@enterprise.com', 'Quick resolution on ticket #45678. The detailed explanation helped us prevent similar issues in the future.', 'positive', 0.88, 'actioned', 'normal', datetime('now', '-8 hours')),
(4, 'Jessica Wilson', 'jwilson@tech.co', 'Upgraded to Enterprise tier and the dedicated support has been worth every penny. Response times are incredible.', 'positive', 0.91, 'new', 'normal', datetime('now', '-1 day')),
(4, 'Robert Taylor', 'rtaylor@agency.com', 'The custom integration support saved our project. Your engineers really know their stuff!', 'positive', 0.94, 'reviewed', 'normal', datetime('now', '-2 days')),
(4, 'Amanda Martinez', 'amartinez@retail.com', 'Thanks for the proactive notification about the scheduled maintenance. Great communication!', 'positive', 0.85, 'new', 'normal', datetime('now', '-3 days')),
(4, 'Christopher Lee', 'clee@finance.com', 'Security audit documentation was provided promptly. Made our compliance review much smoother.', 'positive', 0.89, 'actioned', 'normal', datetime('now', '-4 days')),
(4, 'Sarah Anderson', 'sanderson@health.org', 'HIPAA compliance questions answered thoroughly. Confident in using the platform for patient data.', 'positive', 0.92, 'reviewed', 'normal', datetime('now', '-5 days')),
(4, 'Daniel Garcia', 'dgarcia@edu.edu', 'Educational discount was applied quickly. Great support for academic institutions!', 'positive', 0.87, 'actioned', 'normal', datetime('now', '-6 days')),
(4, 'Michelle Thompson', 'mthompson@nonprofit.org', 'The nonprofit pricing and support has made this accessible for our organization. Thank you!', 'positive', 0.90, 'new', 'normal', datetime('now', '-7 days'));

-- Neutral (7)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(4, 'William Clark', 'wclark@business.com', 'Requesting information about upgrading from Team to Enterprise. What are the main differences?', 'neutral', 0.50, 'new', 'normal', datetime('now', '-2 hours')),
(4, 'Jennifer White', 'jwhite@corp.com', 'Need to update billing information for our account. Please advise on the process.', 'neutral', 0.51, 'new', 'normal', datetime('now', '-6 hours')),
(4, 'David Robinson', 'drobinson@llc.com', 'Inquiry about data export options. We need to generate reports for our quarterly review.', 'neutral', 0.49, 'new', 'normal', datetime('now', '-1 day')),
(4, 'Lisa Harris', 'lharris@inc.com', 'Following up on feature request #12345. Any updates on the roadmap?', 'neutral', 0.52, 'reviewed', 'normal', datetime('now', '-2 days')),
(4, 'James Martin', 'jmartin@solutions.com', 'Need clarification on the SLA terms for our contract renewal.', 'neutral', 0.48, 'new', 'normal', datetime('now', '-3 days')),
(4, 'Nancy Lewis', 'nlewis@group.com', 'Requesting a demo of the new analytics features for our leadership team.', 'neutral', 0.53, 'new', 'normal', datetime('now', '-4 days')),
(4, 'Steven Walker', 'swalker@partners.com', 'Question about API rate limits for our use case. Current limits might be insufficient.', 'neutral', 0.47, 'new', 'normal', datetime('now', '-5 days'));

-- Negative (3)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(4, 'Richard Hall', 'rhall@company.com', 'Very disappointed with the response time on ticket #78901. It''s been 5 business days without any update. This is affecting our production system.', 'negative', 0.18, 'new', 'urgent', datetime('now', '-1 day')),
(4, 'Karen Allen', 'kallen@firm.com', 'Billing discrepancy not resolved after 3 support calls. Being charged for features we don''t use. Escalating to management.', 'negative', 0.15, 'new', 'urgent', datetime('now', '-3 days')),
(4, 'Thomas Young', 'tyoung@corp.net', 'Support agent couldn''t help with our technical issue and didn''t escalate properly. Wasted 2 hours on a call going in circles.', 'negative', 0.22, 'reviewed', 'high', datetime('now', '-5 days'));

-- Email Feedback (15 items) - Source ID: 5
-- Positive (8)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(5, 'Catherine Brooks', 'cbrooks@enterprise.com', 'I wanted to personally thank your team for the exceptional service during our migration. The project was completed ahead of schedule and under budget. We will definitely be recommending your services to our partners.', 'positive', 0.95, 'actioned', 'normal', datetime('now', '-3 hours')),
(5, 'Andrew Foster', 'afoster@startup.io', 'The quarterly business review presentation was excellent. Your team''s insights into our usage patterns helped us optimize our workflow significantly.', 'positive', 0.91, 'reviewed', 'normal', datetime('now', '-9 hours')),
(5, 'Margaret Collins', 'mcollins@agency.net', 'Just renewed our annual contract. The value we''ve gotten from the platform has exceeded our expectations. Looking forward to another great year!', 'positive', 0.93, 'new', 'normal', datetime('now', '-1 day')),
(5, 'Peter Stewart', 'pstewart@consulting.com', 'The custom report feature you developed for us has transformed how we present data to clients. Incredible work!', 'positive', 0.89, 'reviewed', 'normal', datetime('now', '-2 days')),
(5, 'Helen Murphy', 'hmurphy@healthcare.org', 'Compliance documentation for our audit was provided within 24 hours. This level of responsiveness is rare and very much appreciated.', 'positive', 0.92, 'actioned', 'normal', datetime('now', '-3 days')),
(5, 'George Rivera', 'grivera@financial.com', 'The security training session for our team was comprehensive and well-delivered. Our security posture has improved significantly.', 'positive', 0.88, 'new', 'normal', datetime('now', '-4 days')),
(5, 'Dorothy Cox', 'dcox@manufacturing.com', 'Integration with our ERP system was seamless. Your technical team''s expertise made what we thought would be a complex project straightforward.', 'positive', 0.90, 'reviewed', 'normal', datetime('now', '-5 days')),
(5, 'Frank Howard', 'fhoward@logistics.com', 'The performance improvements in the latest release are noticeable. Our dashboard loads 5x faster now!', 'positive', 0.87, 'new', 'normal', datetime('now', '-6 days'));

-- Neutral (5)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(5, 'Ruth Ward', 'rward@retail.com', 'We''re evaluating several vendors for our upcoming project. Could you provide a detailed comparison of your Enterprise features versus competitors?', 'neutral', 0.50, 'new', 'normal', datetime('now', '-5 hours')),
(5, 'Henry Torres', 'htorres@education.edu', 'Our contract is up for renewal next month. We''d like to discuss potential volume discounts given our increased usage.', 'neutral', 0.52, 'new', 'normal', datetime('now', '-1 day')),
(5, 'Virginia Peterson', 'vpeterson@government.gov', 'Requesting documentation on your data sovereignty options. We have specific requirements for government contracts.', 'neutral', 0.49, 'new', 'normal', datetime('now', '-2 days')),
(5, 'Arthur Gray', 'agray@legal.com', 'Please provide updated terms of service and DPA for our legal team''s review before contract renewal.', 'neutral', 0.48, 'new', 'normal', datetime('now', '-4 days')),
(5, 'Deborah James', 'djames@media.com', 'Interested in the beta program for new features. What''s the process to get early access?', 'neutral', 0.54, 'new', 'normal', datetime('now', '-5 days'));

-- Negative (2)
INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, status, priority, created_at) VALUES
(5, 'Ronald Watson', 'rwatson@tech.com', 'We''ve experienced three major outages this month affecting our production environment. This is unacceptable for an enterprise service. We need an immediate meeting with your leadership team to discuss SLA credits and remediation plans.', 'negative', 0.12, 'new', 'urgent', datetime('now', '-12 hours')),
(5, 'Betty Brooks', 'bbrooks@finance.net', 'Our invoice shows charges for 500 seats but we only have 200 active users. This has been going on for 4 months and previous support requests have not resolved it. Considering legal action if not corrected immediately.', 'negative', 0.10, 'new', 'urgent', datetime('now', '-2 days'));

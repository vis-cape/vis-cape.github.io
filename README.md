# UCSD GPA Visualization
https://vcapes.github.io/

- Each bubble represents a course.</br>
- The color is a measure of its average GPA (of all recorded instances on CAPE)
- The size is a measure of the number of yearly students (including summer session)

Some interesting facts:</br>
- The lowest GPA average out of any course with more than 0 yearly students is 2.47, belonging to ECE 35.
  - Note that this does not equate to the "hardest" course.
- Some courses, such as Math 188, do not show up at all because the average GPA for every
iteration of the course is reported as "N/A."
- Inspired by <a href="https://waf.cs.illinois.edu/discovery/gpa_of_every_course_at_illinois/" target="_blank"> this visualization</a>.

Current Goals:
- Lump together departments under their school/college
- Separate chart for time commitment of each course
- Include course descriptions
- Fix the bug where the tooltip squishes near the right side of the screen
- Add an arrow to the tooltip
- Button to toggle historical GPA vs last 2 years

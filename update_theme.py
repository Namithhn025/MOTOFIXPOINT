import re

css_file = "style.css"
with open(css_file, "r") as f:
    css = f.read()

# Replace hex colors
css = css.replace("#8B1A1A", "#FA2D05")
css = css.replace("#B22222", "#FF5A36")
css = css.replace("#5a1010", "#CC1E00")
css = css.replace("#D4370A", "#FF8000")

# Replace RGB values (handling potential spaces)
css = re.sub(r'139,\s*26,\s*26', '250, 45, 5', css)
css = re.sub(r'178,\s*34,\s*34', '255, 90, 54', css)
css = re.sub(r'90,\s*16,\s*16', '204, 30, 0', css)

with open(css_file, "w") as f:
    f.write(css)

print("Updated style.css theme colors")

html_file = "index.html"
with open(html_file, "r") as f:
    html = f.read()

# Update theme colors in HTML
html = html.replace("#8B1A1A", "#FA2D05")
html = html.replace("#5a1212", "#CC1E00")
html = html.replace("#2d0a0a", "#891400")

with open(html_file, "w") as f:
    f.write(html)

print("Updated index.html theme colors")


# Email development assignment

1. **Copy this code repository into your GitHub account**:
Open this link: https://github.com/pxpcee/email-dev-assignment, and use the "Import" feature on GitHub to copy the repository into your account.
   1. Name your new repository like this: assessment-your_full_name (e.g., assessment-joe_kumar).
   2. **Important: Do not use the "Fork" option.**
   3. Need help with importing? Check this guide: [How to Import a Repository](https://docs.github.com/en/migrations/importing-source-code/using-github-importer/importing-a-repository-with-github-importer).
2. **Download the repository and start working**:
Clone your copied repository to your computer and use the Maizzle framework provided in the code to create an email design.
   1. Here’s the email design to build: [Figma Design Link](https://www.figma.com/design/cIzCXiADiNh9EUrCiVlbps/Generic-Layout?node-id=0-1&node-type=canvas).
3. **Commit your work regularly**:
Save and upload your progress step by step to the repository, but keep your commit history clean and meaningful.
4. **Submit your work**:
Once the email is ready, upload all changes to your GitHub repository and send us the link to your repository.


## Evaluation Criteria
You will be evaluated based on the following criteria:

1. Boilerplate Usage
    1. Setup and Configuration: Ability to set up the boilerplate correctly and follow initial instructions.
    2. Understanding Modularity: Effective utilization of the boilerplate's structure without unnecessary modifications to core components.
2. Git Proficiency
    1. Commit Quality: Clarity and descriptiveness of commit messages.
    2. Version Control Practices: Appropriate use of pull requests, conflict resolution, and clear commit history without redundant commits.
3. Software Development Skills
    1. Functionality: Ensuring the email feature meets the requirements.
    2. Code Quality: Writing clean, maintainable code for email components.
    3. Time Management: Ability to complete the assignment within the given time frame.

If anything is not clear, please do not hesitate to ask.

**Good luck and have fun!**

## Hints
- Feel free to explore and use an email sample project located here: https://github.com/pxpcee/email-sample
---

# 🧩 Maizzle framework

## Before you start:

Please make sure you have:

* Installed NodeJS 18 or higher
* Installed prettier in VS code or whatever editor you prefer

# Intro:

Once you clone the files into your local computer, you will see that the folder structure for the Maizzle framework is quite more complex than what we're used to. Let's go through it.

The idea behind using this framework, is that it's a lot easier to share the workload for each template. Each section is coded into different html files, and this means that each team member can work on different sections of each email, without having merging issues on git, for example.

The framework uses Tailwind CSS. This means we have a lot (if not all) of the css attributes that we will ever need in one place. Here's Tailwind CSS cheat sheet for reference: <https://tailwindcomponents.com/cheatsheet/>

If you ever need to add extra styles, then you can do so in the files: Depending on what changes needed to be implemented. `reset.css`, `utilities.css`, or in `layouts.html` in the comment section if it concerns mso only.

Please make sure to go through everything in the README file on the folder you have just cloned. This file will be your go-to for the entire process.

# Process:

The old way of doing emails is creating one big html file with all the code inside it. From now on we will do things a little bit different. Each HTML/email will be divided into sections. You will decide what goes into each section. You can have as many sections as you need. See the screenshot below as an example, each section is defined in the red boxes for your reference:


 ![](attachments/dbec60c6-f8b5-4dc3-a158-df6ea7273512.png " =348x655")


The way you decide to divide each section, is completely up to you. You just have to make sure that’s easy to understand and well organized.

## Project structure

 ![](attachments/32bdfb2c-5c49-4cb8-b576-9b37d6beaa21.png " =214x211")


The most common files that you will work with are in places marked by (\*\*) and they are:

* section: **section-(two digit number).html** - each section of the email that you have to create. Remember that all sections have to follow the same naming pattern: `section-01.html`, `section-02.html`, and so on.
* templates: **index.html** - here you can input your section into email template. Place for your sections are commented inside this file.

Each section will start with its own table.

Let's go through the process of building an email.

Once you define each section of the email, you will need to go into the main template: `assessment-your_full_name/src/templates/index.html`. This is what you will find there:

 ![](attachments/d8bab112-859a-497a-91cc-d41ac5b9a19d.png " =646x463")


In here you will need to call each section, so that when you finish building them, you can see them in your build. The way to do this, is to add `<x-sections.section-01 />`, `<x-sections.section-02 />`, `<x-sections.section-03 />`, etc. You need to add as many sections as you have in your build. You will end up having something like the following:

 ![](attachments/6753250e-95e9-40bd-ab2e-636d548ed5b0.png " =566x402")


The next step is to code each section. For that, you need to go to `assessment-your_full_name/src/components/sections/`. You will need to create as many html files as sections you have in the email.

When all the coding has been done, you will need to run a couple of scripts to get your files ready.

# Final version and testing:


Once you're done, and the email looks similar on localhost as in design, you need to ensure that your email will render correctly on all required email clients. To do it correctly, you have to run the build command (`npm run build`). The reason is that it automatically replaces all your tailwind classes with inline css, which is necessary for testing. Once you run that script, this will generate a folder called dist/full_version, and inside that folder you will find the index.html and the images. This is the html that should be tested.

# Coding tips:

You only need to work with `<table>`, `<tr>` and `<td>`. The usual attributes we add to our tables for example (role="presentation" cellpadding="0" cellspacing="0") have to be left out now, as they're added automatically by the script. You only need to create the main structure, and add the tailwind classes to make it look like we want. Remember that you have Tailwind's cheat sheet for the css: <https://tailwindcomponents.com/cheatsheet/> . Here's an example of the code for reference:

```markup
<table>
    <tr>
        <td>
            <x-image
                class="w-[600px]"
                imgUrl="images/logo.png"
            />
        </td>
    </tr>
</table>
```


```markup
<table>
  <tr>
    <td class="px-[50px]">
      <table>
        <tr>
          <td
            class="text-[#000049] text-[16px] leading-[22px] pt-[26px] text-justify"
          >
          Dear John,
          </td>
        </tr>
        <tr>
          <td
            class="text-[#000049] text-[16px] leading-[22px] pt-[26px] text-justify"
          >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </td>
        </tr>
        <tr>
          <td
            class="text-[#000049] text-[16px] leading-[22px] pt-[26px] text-justify"
          >
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </td>
        </tr>
        <tr>
          <td class="pt-[50px]">
            <x-image
              class="w-[600px]"
              imgUrl="images/blue-line.png"
            />
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```


If you want to create a table that has only one column, see the example below:

```html
<table>
  <tr>
    <td>paragraph 1</td>
  </tr>
  <tr>
    <td>paragraph 2</td>
  </tr>
</table>
```


As you see, every type of content goes **always** inside the `<td>` element.

If you want to have a table with multiple columns, here is how you can do it:

```html
<table>
  <tr>
    <td>column 1</td>
    <td>column 2</td>
    <td>column 3</td>
  </tr>
</table>
```


Sometimes you have to implement a multicolumn table inside a table with only one column, and then you have to use nested tables:

```html
<table>
  <tr>
    <td>
      paragraph 1
    </td>
  </tr>
  <tr>
    <td>
      <table>
        <tr>
          <td>
            column 1
          </td>
          <td>
            column 2
          </td>
          <td>
            column 3
          </td>
        </tr>
      <table>
    </td>
   </tr>
</table>
```


Do not use colspan on tables, it does not work on some email clients - it can also crash your table layout.

Each time you need to add an image, you will need to use the <x-image/> tag to do so. You can add all the different attributes (width, imgUrl, href, etc) inside that tag:

```html
<x-image class="w-[450px]" imgUrl="footer.png" href="#" />
```

# Styling guidelines:

* Use only tailwind classes - we do not use inline CSS or especially custom CSS classes to keep the styling consistent across the whole project. Tailwind css cheet sheet: <https://tailwindcomponents.com/cheatsheet/>
* The only exception to inline styling can be dealing with borders, they may not render in all email clients when using tailwind.
* Do not use any styling on `<tr>` element - styling classes work correctly often only on `<td>` and `<table>` elements.
* Use only paddings (instead of margin, and do not mix the two) - **padding works only on `<td>`!**
* Type the exact values you want to use for properties like padding or text size, for example: **px-\[10px\]** instead of **px-6**. Tailwind by default uses rem and em values, they do not work correctly on all email clients - that's why we always use pixels.
* Padding left and right or padding top and bottom: Instead of adding those separately, you can add padding x (horizontal padding) or padding y(vertical padding). If you use padding x: px-\[10px\] is the same as writing them separately like this: pl-\[10px\] pr-\[10px\]. The same thing applies to padding y: having py-\[15px\] is the same as having the individual values: tp-\[15px\] pb-\[15px\].
* It's possible that some values can repeat often in your email - certain color or font size. You can define these values in tailwind config file (tailwind.config.cjs) during project setup.

  ```javascript
  extend: {
        colors: {
          gray: "#6e6e6e",
          purple: "#dc1a79",
          lightGray: "#f1f1f1",
          blue: "#203e92",
        },
  }
  ```
* On some email clients, the spacing between paragraphs does not work correctly. To deal with this issue you can use example below as a separator:

```html
<p style="text-[12px]">&nbsp;</p>
```

* We defined a special tailwind class to deal with positioning table content:

```html
<table class="align-center-table"></table>
```

```html
<table class="align-right-table"></table>
```

```html
<table class="align-left-table"></table>
```

* **Image size** - when you have to put images inside your section always define the width of `<img>` by tailwind classes w-\[(size)px\]. For example, if your image takes the whole width of the email, you need to add class w-\[600px\].

```html
<x-image
  class="w-[600px]"
  imgUrl="hero.png"
/>
```

* If you need to add a link to an image, you do so by adding an attribute to the image itself. As you may know, we need to add a link to ALL images in Company. This is because we either need a link behind it, or need an empty link tag behind it to prevent the download icon from appearing. If the client hasn't provided a link, then you DON'T need to add a href to the image, this will be done ***automatically*** when you run the script. If the client sends a specific link to it, then you need to add it like this:

```html
<x-image class="w-[450px]" imgUrl="footer.png" href="#" />
```

* If you want your links have underline, use additionally class `class="underline"`

```markup
<a
  href="#"
  class="text-black underline"
  target="_blank"
  >click here</a>
```

* If you have a number or address that shows up as a link in Litmus (blue and underlined), and you need to avoid this, you have to add the following link surrounding such number:

  ```markup
  <a href="#" class="text-black pointer-events-none">0800/78 614</a>
  ```
* We should only use padding top to style your section wrapper. As using padding bottom will cause the problem when sections are merged.
* Provide text-\[sizepx\]on each tag that wrap text, as in outlook font size are not inherited.
* If you need to target something specifically for mobile, you can add a class that targets mobile only. The way to do it is by adding sm: there. For example if you need 2 sections to stack on mobile, you would add the following 2 sm: classes to each <td>:

  ```markup
  <td class="w-[245px] max-w-[245px] sm:w-full sm:inline-block">
  ```


* If you have a number or email address that doesn't have to look like a link, you would add an empty link tag around it with the following classes:

  ```markup
  <a href="#" class="text-black pointer-events-none decoration-none">042735062/E</a>
  ```


* If you have an email address that you don't want it to have an underline to it, you will need to add the following:

```markup
<a
  href="mailto:gdpritaly@company.com?subject=unsubscribe"
  class="text-black decoration-none">gdpritaly@company.com</a>
```

* Hide and show the method for mobile and desktop layouts: Maizzle and Tailwind CSS offer a simple approach to handling desktop and mobile layouts. By using the "hidden" CSS class with responsive breakpoint prefixes, you can easily hide elements on mobile or desktop devices. This technique allows seamless switching between layouts, optimizing the user experience across platforms.

```markup
<p class="sm:hidden block">Hidden on Mobile, Visible on Desktop</p>
<p class="hidden sm:block">Visible on Mobile, Hidden on Desktop</p>
```

* Using `w-full` in the images itself, make the email go wider than required on most outlooks. Please avoid using this class in the images. Adding the actual width of the image will work better. For example, `w-[600px]` instead of `w-full`.
* Superscript can be done this way, and you can play with the different attributes (font-size, vertical-align) to make it look as similar as possible to the visual:

  ```markup
  <span class="text-[9px] [line-height:0] [vertical-align:6px]">1</span>
  ```
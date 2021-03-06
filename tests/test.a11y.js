import { Selector } from "testcafe";

fixture`A11y requirements`;

test("High-contrast style support", async t => {
  const NORMAL_THEME_LINK_RGB = "rgb(37, 120, 203)";
  const HIGH_CONTRAST_THEME_LINK_RGB = "rgb(7, 112, 163)";

  await t.navigateTo(
    "http://localhost:5000/?manifest=http://localhost:5000/test-cartridges/course-1/imsmanifest.xml#/"
  );
  const normalThemeModuleLink = Selector("a").withText(
    "First Module Assignment 1"
  );
  const normalThemeNavigationLink = Selector("a").withText("Modules (1)");

  await t
    .expect(normalThemeModuleLink.exists)
    .ok()
    .expect(normalThemeNavigationLink.exists)
    .ok();

  const normalThemeModuleLinkSnapshot = await normalThemeModuleLink();
  const normalThemeNavigationLinkSnapshot = await normalThemeNavigationLink();

  await t
    .expect(normalThemeModuleLinkSnapshot.style.color)
    .eql(
      NORMAL_THEME_LINK_RGB,
      "Normal contrast module links display proper color"
    );

  await t
    .expect(normalThemeNavigationLinkSnapshot.style.color)
    .eql(
      NORMAL_THEME_LINK_RGB,
      "Normal contrast navigation links display proper color"
    );

  await t.navigateTo(
    "http://localhost:5000/?high-contrast&manifest=http://localhost:5000/test-cartridges/course-1/imsmanifest.xml#/"
  );

  const highContrastThemeModuleLink = Selector("a").withText(
    "First Module Assignment 1"
  );
  const highContrastThemeNavigationLink = Selector("a").withText("Modules (1)");

  const highContrastThemeModuleLinkSnapshot = await highContrastThemeModuleLink();
  const highContrastThemeNavigationLinkSnapshot = await highContrastThemeNavigationLink();

  await t
    .expect(highContrastThemeModuleLinkSnapshot.style.color)
    .eql(
      HIGH_CONTRAST_THEME_LINK_RGB,
      "High contrast module links display proper color"
    );

  await t
    .expect(highContrastThemeNavigationLinkSnapshot.style.color)
    .eql(
      HIGH_CONTRAST_THEME_LINK_RGB,
      "High contrast navigation links display proper color"
    );
});

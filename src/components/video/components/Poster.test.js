import Poster from "./Poster";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
// import react-testing methods
import { render, screen } from "@testing-library/react";

describe("Poster", () => {
  test("loads movie poster", () => {
    // Arrange
    render(
      <Poster
        video={{ name: "", id: "fantasy" }}
        onSetVideo={() => console.log("set")}
        isSeries={false}
      ></Poster>
    );
    // Act
    const imgContainer = screen.getByAltText(/poster/);
    // Assert
    expect(imgContainer).not.toBeNull();
    expect(imgContainer).toHaveAttribute("alt", "Movie poster");
  });
  test("loads show poster", () => {
    // Arrange
    render(
      <Poster
        video={{ name: "", id: "breaking good" }}
        isSeries={true}
      ></Poster>
    );
    // Act
    const imgContainer = screen.getByAltText(/poster/);

    expect(imgContainer).not.toBeNull();
    expect(imgContainer).toHaveAttribute("alt", "Series poster");
    // Assert
  });
});

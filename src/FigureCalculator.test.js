const FigureCalculator = require("./FigureCalculator");
const MathBasic = require("./MathBasic");

describe("A FigureCalculator", () => {
  it("should contain required methods", () => {
    const figureCalculator = new FigureCalculator({});

    expect(figureCalculator).toHaveProperty("calculateRectanglePerimeter");
    expect(figureCalculator).toHaveProperty("calculateRectangleArea");
    expect(figureCalculator).toHaveProperty("calculateTrianglePerimeter");
    expect(figureCalculator).toHaveProperty("calculateTriangleArea");

    expect(figureCalculator.calculateRectanglePerimeter).toBeInstanceOf(
      Function
    );
    expect(figureCalculator.calculateRectangleArea).toBeInstanceOf(Function);
    expect(figureCalculator.calculateTrianglePerimeter).toBeInstanceOf(
      Function
    );
    expect(figureCalculator.calculateTriangleArea).toBeInstanceOf(Function);
  });

  describe("calculateRectanglePerimeter function", () => {
    it("should throw error when not given 2 parameters", () => {
      const figureCalculator = new FigureCalculator({});

      expect(() =>
        figureCalculator.calculateRectanglePerimeter()
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateRectanglePerimeter(1)
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateRectanglePerimeter(1, 2, 3)
      ).toThrowError();
    });

    it("should throw error when parameters are not numbers", () => {
      const figureCalculator = new FigureCalculator({});

      expect(() =>
        figureCalculator.calculateRectanglePerimeter(true, {})
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateRectanglePerimeter(null, "2")
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateRectanglePerimeter([], {})
      ).toThrowError();
    });

    it("should return correct value using MathBasic correctly", () => {
      // Arrange
      const length = 20;
      const width = 10;

      const mathBasicMock = {
        add: jest.fn().mockReturnValue(length + width), // 30
        multiply: jest.fn().mockReturnValue(2 * (length + width)), // 60
      };

      const figureCalculator = new FigureCalculator(mathBasicMock);

      const spyAdd = jest.spyOn(mathBasicMock, "add");
      const spyMultiply = jest.spyOn(mathBasicMock, "multiply");

      // Action
      const result = figureCalculator.calculateRectanglePerimeter(
        length,
        width
      );

      // Assert
      expect(result).toEqual(60);
      expect(spyAdd).toHaveBeenCalledWith(length, width);
      expect(spyMultiply).toHaveBeenCalledWith(2, 30);
    });
  });
});

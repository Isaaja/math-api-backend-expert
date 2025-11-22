const createServer = require("./createServer");
const MathBasic = require("./MathBasic");
const FigureCalculator = require("./FigureCalculator");

describe("A HTTP Server", () => {
  describe("when GET /add", () => {
    it("should respond with a status code of 200 and the payload value is addition result of a and b correctly", async () => {
      // Arrange
      const a = 10;
      const b = 20;
      const spyAdd = jest.spyOn(MathBasic, "add");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/add/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30);
      expect(spyAdd).toBeCalledWith(a, b);
    });
  });
  describe("when GET /subtract", () => {
    it("should respond with a status code of 200 and the payload value is subtraction result of a and b correctly", async () => {
      // Arrange
      const a = 12;
      const b = 8;
      const spySubtract = jest.spyOn(MathBasic, "subtract");
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: "GET",
        url: `/subtract/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(4); // a - b
      expect(spySubtract).toBeCalledWith(a, b);
    });
  });
  describe("when GET /multiply", () => {
    it("should respond with a status code of 200 and the payload value is multiply result of a and b correctly", async () => {
      // Arrange
      const a = 12;
      const b = 8;
      const spyMultiply = jest.spyOn(MathBasic, "multiply");
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: "GET",
        url: `/multiply/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(96); // a * b
      expect(spyMultiply).toBeCalledWith(a, b);
    });
  });
  describe("when GET /divide", () => {
    it("should respond with a status code of 200 and the payload value is divide result of a and b correctly", async () => {
      // Arrange
      const a = 16;
      const b = 8;
      const spyDivide = jest.spyOn(MathBasic, "divide");
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: "GET",
        url: `/divide/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(2); // a / b
      expect(spyDivide).toBeCalledWith(a, b);
    });
  });
  describe("when GET /rectangle-perimeter", () => {
    it("should respond with a status code of 200 and payload value is rectangle perimeter correctly", async () => {
      // Arrange
      const length = 16;
      const width = 8;

      const mathBasic = {
        add: jest.fn(),
        multiply: jest.fn(),
      };

      mathBasic.add.mockReturnValue(length + width);
      mathBasic.multiply.mockReturnValue(2 * (length + width));

      const figureCalculator = new FigureCalculator(mathBasic);

      const spyPerimeter = jest.spyOn(
        figureCalculator,
        "calculateRectanglePerimeter"
      );

      const server = createServer({ figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/rectangle-perimeter/${length}/${width}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(48);
      expect(spyPerimeter).toBeCalledWith(length, width);
    });
  });
  describe("when GET /rectangle-area", () => {
    it("should respond with a status code of 200 and payload value is rectangle area correctly", async () => {
      // Arrange
      const length = 2;
      const width = 8;

      const mathBasic = {
        multiply: jest.fn().mockReturnValue(length * width),
      };

      const figureCalculator = new FigureCalculator(mathBasic);

      const spyArea = jest.spyOn(figureCalculator, "calculateRectangleArea");

      const server = createServer({ figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/rectangle-area/${length}/${width}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(16);
      expect(spyArea).toBeCalledWith(length, width);
    });
  });
});

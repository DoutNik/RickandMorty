const {server} = require("../src/app");
const session = require("supertest");

const agent = session(server);

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });
    
    it("Si hay un error responde con status: 500", async () => {
       await agent.get("/rickandmorty/character/3312").expect(500);
    });
  
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "location", "status", "origin" e "image"', async () => {
      const { body } = await agent.get("/rickandmorty/character/1");
    
      const expectedProperties = [
        "id",
        "name",
        "species",
        "gender",
        "location",
        "status",
        "origin",
        "image",
      ];
    
      for (const prop of expectedProperties) {
        expect(body).toHaveProperty(prop);
      }
    });
  });
  describe("GET /rickandmorty/login", () => {
   // let access = {access: true}
    it("Debería obtener {access: true} con información de login correcta", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?email=carlosklema@hotmail.com&password=021354")
      expect(body.access).toEqual(true);
    });

    it("Debería obtener {access: false} con información de login incorrecta", async () => {
      const { body } = await agent
        .get("/rickandmorty/login?email=correoincorrecto@example.com&password=contraseñaincorrecta")
        expect(body.access).toEqual(false);
    });
  })

  describe("POST /rickandmorty/fav", () => {
    const elemento1 = { id: 1, name: "TEST A" };
    const elemento2 = { id: 2, name: "TEST B" };

    it("Lo que envíes por body debe ser devuelto en un arreglo", async () => {
      const {body} = await agent.post("/rickandmorty/fav").send(elemento1);

      expect(body).toContainEqual(elemento1);
    });

    it("Si envías un nuevo elemento por body, debe ser devuelto en un arreglo que incluye elementos previamente enviados", async () => {
      const { body } = await agent.post("/rickandmorty/fav").send(elemento2);

      expect(body).toContainEqual(elemento1);
      expect(body).toContainEqual(elemento2);
    });
  })

    describe("DELETE /rickandmorty/fav/:id", () => {
      const elemento1 = { id: 1, name: "TEST A" };
      const elemento2 = { id: 2, name: "TEST B" };
  
      it("Si no se elimina ningun personaje devuelve el mismo array", async () => {
        const { body } = await agent.delete("/rickandmorty/fav/3312");
  
        expect(body).toContainEqual(elemento1);
        expect(body).toContainEqual(elemento2);
      });
  
      it("Elimina al personaje recibido por ID", async () => {
        const { body } = await agent.delete("/rickandmorty/fav/2");
  
        expect(body).not.toContainEqual(elemento2);
      });
    });
  });

import random


def lanzar_dado():
    return random.randint(1, 6)


def main():
    print("🎲 Bienvenido al Simulador de Dados (Consola)")
    while True:
        respuesta = input(
            "\nPresiona 'Enter' para lanzar el dado o escribe 'salir' para terminar: "
        )
        if respuesta.lower() == "salir":
            break
        resultado = lanzar_dado()
        print(f"🎲 Has lanzado un {resultado}!")

    print("\nGracias por jugar. ¡Hasta la próxima! 👋")


if __name__ == "__main__":
    main()


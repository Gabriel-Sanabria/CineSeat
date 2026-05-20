---
name: Bug EF Core Tools 10.0.7 — design assembly incorrecto
description: EF Core Tools 10.0.7 tiene un error en su nuspec que declara dependencia de Design 8.0.0 en lugar de 10.0.7; requiere agregar Design 10.0.7 explícitamente al proyecto.
type: project
---

`Microsoft.EntityFrameworkCore.Tools 10.0.7` declara en su `.nuspec` la dependencia `Microsoft.EntityFrameworkCore.Design` apuntando a la versión `8.0.0` (error de empaquetado en NuGet). Cuando `dotnet ef` lanza el proceso de diseño, resuelve `ef.dll` contra el Design `8.0.0`, que es incompatible con los assemblies del proyecto en `net10.0`. El síntoma es `MissingMethodException: Method not found: 'System.String Microsoft.EntityFrameworkCore.Diagnostics.AbstractionsStrings.ArgumentIsEmpty(System.Object)'`.

**Why:** La versión `10.0.7` de `Microsoft.EntityFrameworkCore.Design` existe en nuget.org y es compatible, pero no se descarga automáticamente porque el `.nuspec` de Tools la pide como `8.0.0`.

**How to apply:** Al agregar migraciones EF Core en proyectos `net10.0`, siempre incluir explícitamente en el `.csproj`:

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.7">
  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  <PrivateAssets>all</PrivateAssets>
</PackageReference>
```

Esto fuerza a que el proceso de diseño use el assembly correcto en tiempo de ejecución.

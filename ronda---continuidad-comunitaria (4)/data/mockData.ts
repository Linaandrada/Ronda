
import { Encounter, User, UserRole } from '../types';

export const mockEncounters: Encounter[] = [
  {
    id: '1',
    title: 'Estructuras de la intimidad',
    date: '2023-05-18',
    location: 'Estudio Ronda — Barrio General Paz',
    promptQuestion: '¿Qué estructura sostiene la distancia justa entre dos personas que se quieren, y qué pasa cuando esa estructura falla?',
    content: null,
    readings: [
      {
        title: 'La presentación de la persona en la vida cotidiana — Capítulo 2: Equipos',
        author: 'Erving Goffman',
        paragraph1: 'Goffman analiza cómo las interacciones humanas funcionan como performances teatrales donde cada persona maneja impresiones. En el capítulo sobre equipos, desarrolla la idea de que la intimidad no es ausencia de performance sino un tipo específico de actuación compartida. Los equipos son grupos que cooperan para mantener una definición consensuada de la situación, ocultando ciertos aspectos y destacando otros. La intimidad sería entonces un equipo de dos que negocia constantemente qué mostrar, qué ocultar y cómo hacerlo.',
        paragraph2: 'Trabajamos específicamente el concepto de \'región posterior\' versus \'región anterior\': esos espacios donde nos preparamos versus donde actuamos. En las relaciones íntimas, la región posterior se comparte gradualmente, pero Goffman advierte que incluso ahí seguimos manejando cierta imagen. La pregunta que planteé al grupo fue: ¿existe realmente un espacio sin performance o simplemente cambiamos de audiencia? ¿Qué pasa cuando la pareja se convierte en audiencia de nuestra región posterior?',
        paragraph3: 'Propuse la hipótesis de que la crisis en las relaciones surge cuando uno de los dos rompe el pacto tácito del equipo: cuando alguien expone información que debía quedar en la región posterior, o cuando las performances dejan de estar coordinadas.'
      },
      {
        title: 'El arte de amar — Capítulo 2: La teoría del amor',
        author: 'Erich Fromm',
        paragraph1: 'Fromm plantea que el amor no es un sentimiento pasivo sino una actividad, un arte que requiere disciplina, concentración y paciencia. Argumenta contra la idea romántica del amor como algo que \'sucede\' y propone entenderlo como una capacidad que se desarrolla.',
        paragraph2: 'Trabajamos el concepto de que amar es dar, no recibir, pero dar entendido no como sacrificio sino como expresión de potencia. Fromm distingue entre dar como empobrecimiento y dar como la forma más alta de vitalidad.',
        paragraph3: 'El marco que propuse fue que muchas relaciones funcionan en un modelo extractivo disfrazado de amor: esperamos que la otra persona llene nuestros vacíos.'
      },
      {
        title: 'Teoría del apego — Capítulo 4: Estilos de apego en la adultez',
        author: 'John Bowlby',
        paragraph1: 'Bowlby desarrolla cómo los patrones de vinculación temprana con las figuras de cuidado se internalizan como modelos operativos internos que luego estructuran nuestras relaciones adultas.',
        paragraph2: 'Trabajamos con la idea de que no elegimos conscientemente nuestro estilo de apego, pero una vez que lo reconocemos podemos modificarlo. El concepto clave fue \'modelo operativo interno\'.',
        paragraph3: 'La hipótesis que planteé fue que gran parte de los conflictos de pareja son en realidad diálogos entre estilos de apego incompatibles que ni siquiera son conscientes.'
      }
    ],
    summaryParagraph: 'Comenzamos con un mapeo conceptual: si las relaciones tienen arquitectura, ¿cuáles son sus elementos estructurales? Goffman nos dio el lenguaje de la performance y los equipos. Fromm nos obligó a distinguir entre amor como arte y amor como necesidad. Bowlby nos mostró que traemos planos heredados de vínculos anteriores.',
    herramientasMetodologicas: [
      'Análisis de tres capas: superficie observable (Goffman), trabajo interno (Fromm), estructura heredada (Bowlby)',
      'Mapeo de respuestas automáticas ante conflicto para identificar estilo de apego',
      'Distinción entre dar desde abundancia versus dar desde deuda o vacío',
      'Lectura de interacciones como performances con región anterior/posterior',
      'Formulación de hipótesis sobre qué sostiene estructuralmente una relación específica'
    ],
    keyIdeas: [
      'La intimidad no es ausencia de performance sino performance compartida y coordinada',
      'Los estilos de apego son estrategias adaptativas, no rasgos fijos de personalidad',
      'Amar como capacidad que se desarrolla versus amor como algo que sucede pasivamente',
      'Las crisis relacionales como ruptura del equipo performático, no de autenticidad',
      'Los modelos operativos internos determinan qué interpretamos como amenaza o seguridad',
      'Dar en el amor como expresión de potencia, no como sacrificio empobrecedor',
      'La región posterior compartida sigue siendo una región con cierta gestión de imagen',
      'La distancia justa en una relación como resultado de negociación tácita constante'
    ],
    attendees: ['Clara Domínguez', 'Martín Salas', 'Eugenia Robles', 'Fernando Bravo', 'Daniela Campos'],
    comments: [
      { author: "Clara Domínguez", text: "Nunca había pensado que mi forma de amar tuviera que ver con estrategias de supervivencia de cuando era chica.", date: "2023-05-18 22:10" },
      { author: "Martín Salas", text: "Lo de Goffman sobre equipos me voló la cabeza. Literalmente puedo ver las veces que mi pareja y yo rompimos el equipo sin darnos cuenta.", date: "2023-05-19 09:35" },
      { author: "Eugenia Robles", text: "Apliqué la herramienta de mapeo de respuestas automáticas y me di cuenta que siempre me alejo cuando hay conflicto. Apego evitativo a full.", date: "2023-05-19 14:50" },
      { author: "Fernando Bravo", text: "La distinción de Fromm entre 'te amo porque te necesito' y 'te necesito porque te amo' parece sutil pero es brutal.", date: "2023-05-20 10:20" },
      { author: "Daniela Campos", text: "Eugenia, a mí me pasa lo opuesto. Ansioso total. Busco gente evitativa sin querer.", date: "2023-05-20 16:45" }
    ]
  },
  {
    id: '2',
    title: 'Economías de la atención',
    date: '2023-06-22',
    location: 'Estudio Ronda — Barrio General Paz',
    promptQuestion: '¿A qué le prestaste atención hoy sin darte cuenta, y qué dice eso sobre cómo estás construyendo tu realidad?',
    content: null,
    readings: [
      {
        title: 'Atención y hábito — Capítulo 3 de Principios de Psicología',
        author: 'William James',
        paragraph1: 'James desarrolla una de las definiciones más influyentes de atención: \'La atención es la toma de posesión por la mente, de forma clara y vívida, de uno entre varios objetos o trenes de pensamiento simultáneamente posibles\'.',
        paragraph2: 'Trabajamos específicamente la distinción que James hace entre atención voluntaria y atención involuntaria. La voluntaria requiere esfuerzo sostenido y se agota rápidamente.',
        paragraph3: 'Planteé la hipótesis de que vivimos en un estado de atención secuestrada permanente. Si James tiene razón, entonces quien controla nuestra atención controla nuestra experiencia.'
      },
      {
        title: 'El capitalismo de la atención — Capítulo 1: La economía de la atención',
        author: 'Georg Franck',
        paragraph1: 'Franck argumenta que en la economía contemporánea, la atención se ha convertido en el recurso más escaso y valioso. A diferencia del dinero, la atención es un recurso finito.',
        paragraph2: 'Exploramos cómo las plataformas están diseñadas para maximizar \'tiempo de atención\' mediante técnicas derivadas de la psicología conductual: refuerzo variable, loops de recompensa.',
        paragraph3: 'La hipótesis que planteé fue que el capitalismo de atención genera una forma particular de subjetividad: nos volvemos productores compulsivos de contenido.'
      },
      {
        title: 'Meditación y neuroplasticidad — Capítulo 5 de El cerebro de Buda',
        author: 'Rick Hanson',
        paragraph1: 'Hanson sintetiza investigación neurocientífica sobre meditación para argumentar que la atención es entrenable.',
        paragraph2: 'Trabajamos con la distinción entre dos tipos de meditación: concentración focal y monitoreo abierto. Hicimos un ejercicio de 10 minutos de concentración en la respiración.',
        paragraph3: 'El marco que propuse fue que si la atención es plástica y entrenable, entonces tenemos más agencia de la que creemos.'
      }
    ],
    summaryParagraph: 'El encuentro comenzó con un ejercicio incómodo: pedí que apagaran todos los teléfonos y los pusieran en una caja durante dos horas. Trabajamos con tres capas del mismo fenómeno: James nos dio la base teórica, Franck nos mostró el contexto económico y Hanson nos ofreció una salida.',
    herramientasMetodologicas: [
      'Registro de atención voluntaria versus involuntaria durante 24 horas para mapear patrones',
      'Cálculo de horas de atención entregadas a plataformas versus invertidas en proyectos propios',
      'Ejercicio de concentración focal para establecer baseline de dispersión mental',
      'Distinción entre atención como selección consciente versus atención capturada',
      'Análisis de tres capas: teoría (James), contexto económico (Franck), práctica (Hanson)'
    ],
    keyIdeas: [
      'La atención no registra realidad sino que construye realidad mediante selección',
      'La atención es el único recurso verdaderamente finito que tenemos: no se acumula ni transfiere',
      'Las plataformas digitales no venden productos sino nuestra atención como commodity',
      'Vivimos en déficit atencional estructural que compensamos con más captura externa',
      'La atención sostenida es prerequisito para proyectos de largo plazo y pensamiento complejo',
      'La neuroplasticidad indica que la atención es entrenable, no fija',
      'Recuperar agencia atencional requiere práctica deliberada, no sucede espontáneamente',
      'El secuestro de atención genera una forma de subjetividad: productores/consumidores compulsivos'
    ],
    attendees: ['Nicolás Herrera', 'Abril Mendoza', 'Gonzalo Rivas', 'Camila Ortega', 'Julián Castro'],
    comments: [
      { author: "Nicolás Herrera", text: "Hice el registro de 24 horas y es devastador. Literalmente no tuve ni 30 minutos de atención voluntaria.", date: "2023-06-22 22:45" },
      { author: "Abril Mendoza", text: "El ejercicio de los 10 minutos de concentración me mostró que no puedo sostener atención ni medio minuto.", date: "2023-06-23 10:15" },
      { author: "Gonzalo Rivas", text: "Calculé mis horas de pantalla semanal. 38 horas. Eso es más que un trabajo full time.", date: "2023-06-23 15:40" },
      { author: "Camila Ortega", text: "Me costó el ejercicio de escribir qué construiría con mi atención. Pura dispersión.", date: "2023-06-24 09:20" },
      { author: "Julián Castro", text: "Abril, same. Yo me dispersé como 30 veces en 10 minutos. Pero Hanson dice que es entrenable.", date: "2023-06-24 14:30" }
    ]
  },
  {
    id: '3',
    title: 'Narrativas del fracaso',
    date: '2023-07-27',
    location: 'Encuentro online',
    promptQuestion: '¿Qué historia te contás sobre tus fracasos, y cómo esa historia determina qué intentás después?',
    content: null,
    readings: [
      {
        title: 'La construcción narrativa de la realidad — Capítulo 2',
        author: 'Jerome Bruner',
        paragraph1: 'Bruner argumenta que los seres humanos organizamos nuestra experiencia mediante estructuras narrativas. No recordamos eventos como datos aislados sino como historias.',
        paragraph2: 'Trabajamos con el concepto de \'self narrativo\': la historia que nos contamos sobre quiénes somos. Bruner sostiene que esta historia no es reflejo pasivo sino constructor activo.',
        paragraph3: 'La hipótesis que planteé fue que nuestras narrativas sobre el fracaso funcionan como profecías autocumplidas. No es optimismo ingenuo sino arquitectura narrativa estratégica.'
      },
      {
        title: 'Mindset: La actitud del éxito — Capítulo 3: La mentalidad de crecimiento',
        author: 'Carol Dweck',
        paragraph1: 'Dweck distingue entre mentalidad fija y mentalidad de crecimiento. La mentalidad fija cree que las capacidades son esenciales e inmutables.',
        paragraph2: 'Exploramos cómo estas mentalidades se manifiestan concretamente. Ante un fracaso, mentalidad fija busca confirmar que no era para uno. Mentalidad de crecimiento busca información útil.',
        paragraph3: 'El marco que propuse fue que las mentalidades de Dweck son narrativas encubiertas. Con mentalidad fija, el fracaso cierra caminos. Con mentalidad de crecimiento, abre información.'
      }
    ],
    summaryParagraph: 'El encuentro online tuvo una energía particular. Comenzamos compartiendo fracasos recientes. Después introduje a Bruner: ¿cómo estamos narrando estos fracasos? Descubrimos que la narrativa no es la realidad sino una interpretación, y por lo tanto, tenemos agencia narrativa.',
    herramientasMetodologicas: [
      'Renarración de eventos desde tres estructuras narrativas distintas para ver cómo cambia el significado',
      'Identificación de respuestas automáticas ante fracaso: ¿interpretación esencialista o procesual?',
      'Uso de \'todavía no\' como herramienta para abrir narrativas cerradas',
      'Distinción entre narrativa identitaria (\'soy así\') y narrativa procesual (\'hice esto\')',
      'Mapeo de cómo las narrativas sobre fracaso determinan qué intentamos después'
    ],
    keyIdeas: [
      'Las narrativas no reflejan la experiencia, la construyen y determinan su significado',
      'El self narrativo es constructor activo de identidad, no registro pasivo de hechos',
      'Las narrativas sobre fracaso funcionan como profecías autocumplidas',
      'Mentalidad fija narra fracaso como revelación de esencia inmutable',
      'Mentalidad de crecimiento narra fracaso como información sobre proceso',
      'Tenemos más agencia narrativa de la que ejercemos habitualmente',
      'Coherencia performativa: actuamos de manera consistente con la historia que creemos vivir',
      'Cambiar la narrativa no cambia los hechos pero sí cambia radicalmente qué hacemos con ellos'
    ],
    attendees: ['Valentina Giménez', 'Lucas Medina', 'Jimena Ríos', 'Tomás Cabrera', 'Lucía Fernández'],
    comments: [
      { author: "Valentina Giménez", text: "El ejercicio de renarrar con 'todavía no' me partió. Cambia todo.", date: "2023-07-27 23:05" },
      { author: "Lucas Medina", text: "Me costó horrores despegar las narrativas de lo que creo que soy realmente.", date: "2023-07-28 10:40" },
      { author: "Jimena Ríos", text: "Apliqué la herramienta de Dweck a un fracaso laboral reciente. Es accionable.", date: "2023-07-28 16:20" },
      { author: "Tomás Cabrera", text: "Básicamente somos method actors de nuestras propias historias. Bruner es denso pero vale la pena.", date: "2023-07-29 09:15" },
      { author: "Lucía Fernández", text: "Tengo narrativas sobre mí misma que tienen como 20 años de antigüedad. Cambiarlas se siente como traición.", date: "2023-07-29 14:50" }
    ]
  },
  {
    id: '4',
    title: 'Tecnologías del yo',
    date: '2023-08-31',
    location: 'Estudio Ronda — Barrio General Paz',
    promptQuestion: '¿Qué prácticas cotidianas usás para construir la persona que querés ser, y cuáles te construyen sin que te des cuenta?',
    content: null,
    readings: [
      {
        title: 'Tecnologías del yo — Conferencia 1: Las técnicas de sí mismo',
        author: 'Michel Foucault',
        paragraph1: 'Foucault desarrolla el concepto de \'tecnologías del yo\': prácticas mediante las cuales los individuos actúan sobre sí mismos para transformarse.',
        paragraph2: 'Trabajamos específicamente la distinción entre tecnologías que apuntan a \'conocerse\' versus tecnologías que apuntan a \'gobernarse\'.',
        paragraph3: 'La hipótesis incómoda que planteé fue: muchas de nuestras prácticas de autoconstrucción no son realmente nuestras sino formas de subjetivación externas.'
      },
      {
        title: 'El poder del hábito — Capítulo 2: El loop del hábito',
        author: 'Charles Duhigg',
        paragraph1: 'Duhigg descompone la neurociencia del hábito en un loop de tres pasos: señal, rutina, recompensa. Los hábitos son arquitecturas que operan bajo el nivel de conciencia.',
        paragraph2: 'Exploramos cómo identificar y modificar loops de hábito. Duhigg argumenta que no se pueden eliminar hábitos, solo reemplazar la rutina.',
        paragraph3: 'El marco que propuse conectó Foucault con Duhigg: los hábitos son tecnologías del yo no reflexivas. Operan en modo automático pero nos construyen igual.'
      },
      {
        title: 'La invención de uno mismo — Capítulo 4: Narrativa y construcción identitaria',
        author: 'Paul Ricoeur',
        paragraph1: 'Ricoeur desarrolla la idea de \'identidad narrativa\': nos construimos mediante las historias que contamos sobre nosotros. No tenemos una esencia fija.',
        paragraph2: 'Trabajamos con el concepto de \'trama\': la estructura que conecta eventos dispersos en una historia coherente. Ricoeur argumenta que necesitamos trama para darle sentido a nuestra vida.',
        paragraph3: 'La hipótesis que planteé fue que la identidad narrativa es otra tecnología del yo, quizás la más fundamental. Nos construimos contándonos.'
      }
    ],
    summaryParagraph: 'El encuentro tuvo tres movimientos. Primero inventariamos prácticas conscientes (Foucault). Segundo, los hábitos invisibles (Duhigg). Tercero, la narrativa estructurante (Ricoeur). Terminamos con una pregunta abierta: si pudieran diseñar deliberadamente las tecnologías que los construyen, ¿cuáles elegirían?',
    herramientasMetodologicas: [
      'Inventario de tecnologías del yo actualmente en uso: conscientes e inconscientes',
      'Descomposición de hábitos en señal-rutina-recompensa para identificar palancas de cambio',
      'Mapeo de día completo para distinguir decisiones conscientes versus hábitos automáticos',
      'Identificación de tramas narrativas dominantes y evaluación de si siguen siendo útiles',
      'Pregunta de diseño: si pudieran elegir deliberadamente sus tecnologías del yo, ¿cuáles elegirían?'
    ],
    keyIdeas: [
      'Las tecnologías del yo son prácticas sistemáticas que nos transforman según racionalidades específicas',
      'Muchas prácticas de autoconstrucción son heredadas culturalmente, no elegidas conscientemente',
      'Los hábitos son tecnologías del yo no reflexivas que operan bajo nivel de conciencia',
      'Gran parte de nuestra autoconstrucción sucede en hábitos microscópicos, no en prácticas conscientes',
      'La identidad narrativa es quizás la tecnología del yo más fundamental: nos construimos contándonos',
      'Las narrativas sobre nosotros no solo describen sino que prescriben qué acciones parecen coherentes',
      'Podemos ser autores más deliberados de las tecnologías que nos construyen',
      'La pregunta crítica no es si usar tecnologías del yo sino cuáles y para construir qué tipo de sujeto'
    ],
    attendees: ['Agustina Morales', 'Maximiliano Torres', 'Florencia Arias', 'Diego Romero', 'Martina Lagos'],
    comments: [
      { author: "Agustina Morales", text: "El inventario de tecnologías me voló. Literalmente todas mis prácticas las copié de Instagram.", date: "2023-08-31 22:50" },
      { author: "Maximiliano Torres", text: "Foucault es heavy pero necesario. ¿Me transformo en lo que quiero o en lo que el sistema necesita?", date: "2023-09-01 10:35" },
      { author: "Florencia Arias", text: "90% hábitos automáticos. Básicamente soy un conjunto de loops que se ejecutan sin mí.", date: "2023-09-01 15:20" },
      { author: "Diego Romero", text: "Apliqué la herramienta de señal-rutina-recompensa a mi hábito de scrollear. Ahora busco rutinas alternativas.", date: "2023-09-02 09:45" },
      { author: "Martina Lagos", text: "Lo de Ricoeur conecta perfecto con el encuentro anterior sobre fracaso. Nos construimos contándonos.", date: "2023-09-02 14:10" }
    ]
  },
  {
    id: '5',
    title: 'Futuro Incierto',
    date: '2026-12-01',
    time: '19:00 — 21:00',
    location: 'Estudio Ronda — Barrio General Paz',
    promptQuestion: '¿Cómo habitas la incertidumbre cuando todos los planos parecen estar en blanco?',
    content: 'Un encuentro para explorar la quietud en medio del caos. Diseñaremos estrategias de navegación para tiempos donde las brújulas tradicionales ya no marcan el norte.',
    attendees: [],
    comments: []
  }
];

export const mockUsers = {
  admin: { name: 'Ana García', role: UserRole.ADMIN },
  participant: { name: 'Carlos López', role: UserRole.PARTICIPANT }
};

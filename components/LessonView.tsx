import MiniPlayground from './MiniPlayground';
import RichText from './RichText';
import { lessonNo, type Lesson, type Snippet } from '@/lib/content';
import type { Settings } from '@/lib/usePersistent';

export default function LessonView({
  lesson,
  settings,
  onLoad,
  footer,
}: {
  lesson: Lesson;
  settings: Settings;
  onLoad?: (s: Snippet, lessonId: string) => void;
  footer?: React.ReactNode;
}) {
  return (
    <div className="lesson">
      <div className="cap" style={{ marginTop: 0 }}>
        {lesson.group} · Topik {lessonNo(lesson)}
      </div>
      <h2>{lesson.title}</h2>
      <p>
        <RichText text={lesson.text} />
      </p>
      {lesson.tip && (
        <p className="tip">
          <b>Ingat: </b>
          <RichText text={lesson.tip} />
        </p>
      )}
      {lesson.examples.map((ex, i) => (
        <section key={lesson.id + i}>
          <h3 className="ex">{ex.title}</h3>
          {ex.note && (
            <p className="note">
              <RichText text={ex.note} />
            </p>
          )}
          <MiniPlayground
            snippet={ex.snippet}
            lang={lesson.lang}
            settings={settings}
            onLoad={onLoad && ((s) => onLoad(s, lesson.id))}
          />
        </section>
      ))}
      {footer}
    </div>
  );
}

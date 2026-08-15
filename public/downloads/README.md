# 자료실 — 무료 도구 등록하는 법

`index.json` 에 한 덩이 넣으면 `/resources/downloads` 목록에 나온다.
빌드도 코드 수정도 필요 없다 — 릴리즈 노트와 같은 방식이다.

```json
[
  {
    "slug": "orange-log-collector",
    "version": "1.0.0",
    "date": "2026-08-16",
    "os": "Windows 10/11 · 64bit",
    "size": 4713984,
    "sha256": "a1b2c3…",
    "file": "/downloads/orange-log-collector-1.0.0.exe",
    "i18n": {
      "ko": { "name": "로그 수집기", "desc": "문의 접수에 필요한 로그를 한 번에 모읍니다." },
      "en": { "name": "Log Collector", "desc": "Collects the logs we need for a support ticket." }
    }
  }
]
```

| 필드 | 설명 |
|---|---|
| `slug` | 고유 id. 파일명과 맞춰 두면 관리가 쉽다 |
| `version` `date` | 표시용. `date` 는 `YYYY-MM-DD` |
| `os` | 동작 환경 한 줄. 없으면 생략된다 |
| `size` | **바이트 수**(정수). 화면에서 MB 로 환산한다 |
| `sha256` | 아래 참조. 빼도 되지만 되도록 넣는다 |
| `file` | 사이트 루트 기준 경로, 또는 `https://` 로 시작하는 외부 주소 |
| `i18n` | `ko` 는 필수. 없는 언어는 `ko` 로 떨어진다 (`en`·`ja`·`zh-Hans`·`zh-Hant`) |

## 실행파일을 이 저장소에 넣지 말 것

`.exe` 는 커밋할 때마다 저장소에 통째로 쌓이고 지워도 이력에 남는다.
몇 MB 짜리 하나면 몰라도, 판올림할 때마다 늘어난다.

**외부 저장소에 올리고 `file` 에 그 주소를 적는다.** 경로(`/downloads/...`)를
쓰는 건 아주 작은 것(1MB 미만) 한둘까지다.

## SHA-256 은 왜 넣나

내려받은 파일이 도중에 바뀌지 않았는지 받는 쪽이 확인할 수 있다.
백신이 잡았을 때 "우리가 낸 그 파일이 맞다" 를 대는 근거도 된다.

```powershell
Get-FileHash .\orange-log-collector-1.0.0.exe -Algorithm SHA256
```

크기도 같이 확인:

```powershell
(Get-Item .\orange-log-collector-1.0.0.exe).Length
```

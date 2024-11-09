import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';
import { Gender } from 'src/shared/types/gender.enum';
import { Role } from 'src/shared/types/role.enum';
import { Subway } from 'src/shared/types/subway.enum';
import { User } from 'src/shared/types/user.interface';
import { compareHash, generateHash } from 'src/shared/utils/hasher';

export class UserEntity extends Entity implements StorableEntity<User> {
  name: string;
  email: string;
  avatarUrl: string;
  passwordHash: string;
  gender: Gender;
  birthday?: Date;
  description: string;
  subway: Subway;
  imageUrl: string;
  avatarId: string;
  role: Role;

  constructor(user?: User) {
    super();
    this.populate(user);
  }

  public populate(user?: User): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.email = user.email;
    this.name = user.name;
    this.avatarUrl = user.avatarUrl;
    this.passwordHash = user.passwordHash;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.description = user.description;
    this.subway = user.subway;
    this.imageUrl = user.imageUrl;
    this.avatarId = user.avatarId;
    this.role = user.role;
  }

  public toPOJO(): User {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      name: this.name,
      avatarUrl: this.avatarUrl,
      gender: this.gender,
      birthday: this.birthday,
      description: this.description,
      subway: this.subway,
      imageUrl: this.imageUrl,
      avatarId: this.avatarId,
      role: this.role,
    };
  }

  public async setPassword(password: string) {
    this.passwordHash = await generateHash(password);
    return this;
  }

  public async comparePassword(password: string) {
    return compareHash(password, this.passwordHash);
  }
}
